<template>
  <div>
    <div v-if="error">
      <Error :username="this.$route.params.user" :errorType="error" />
    </div>

    <div v-else>  

      <div v-if="showIntro">
        <Intro />
      </div>

      <div v-else>

        <div v-show="showToolbar">

          <Toolbar 
          :title="$vuetify.breakpoint.smAndUp ? 'My Portfolio' : ''"
          :exitAction="() => $router.push('/')"
          >
            <template #actions>
              <v-btn :disabled="invalidComponents.length > 0" 
                class="mr-2" color="primary" 
                @click.stop="sendUserToPreview()">
                <v-icon class="mr-2">mdi-file-eye-outline</v-icon>
                Preview
              </v-btn>
              <Steps />
              <v-btn dark class="ml-2" color="orange darken-1" @click.stop="editMode ? updatePortfolioRemote() : createPortfolioRemote()">
                {{ editMode ? 'Save' : 'Create' }}
              </v-btn>
            </template>
          </Toolbar>

          <div class="mx-12">
            <v-text-field 
              label="Username of Portfolio (for lookup)"
              v-model="username"
            />
          </div>

        </div>

        <Main
          ref="main"
          @update-component-data="updateComponentData($event)"
          @validate="validatePortfolioComponents()"
          :userData="userData"
          :invalidComponents="invalidComponents"
        />

      </div>

      <!-- <b-button v-on:click="showIntro = !showIntro">Toggle Intro/Main</b-button> -->
      <!-- <pre>{{ userData }}</pre> -->
      
    </div>
  </div>
</template>

<script>
import Intro from '../components/CreateComponents/CreateIntro.vue'
import Main from '../components/CreateComponents/CreateMain.vue'
import Error from '../components/ErrorDisplay.vue'
import Steps from '../components/CreateComponents/CreateSubComponents/NonPortfolioComponents/StepByStep.vue'
import Toolbar from '../components/ReusableComponents/CreateToolbar.vue'
import DatabaseServices from '../DatabaseServices.js'
import validatePortfolio from '../utils/ValidatePortfolio'

export default {
  components: {
    Main,
    Intro,
    Error,
    Steps,
    Toolbar
  },
  data: () => {
    return {

      username: '',

      showToolbar: true,
      error: false,
      showIntro: false,
      editMode: false,
      invalidComponents: [],
      userData: 
      {
        header: {
          name: '',
          headshotURL: '',
          professionalTitle: '',  
          links: [],    
          email: '',
          phone: ''
        },
        visibility: true
      }
    }
  },
  async created() {

    /* checks if user is being redirected back from preview mode */
    if (localStorage?.userData) {
      try {
        this.userData = JSON.parse(localStorage.userData);
        this.showIntro = false;
        if (this.$route.params?.user) this.editMode = true;
        localStorage.removeItem('userData');
        setTimeout(() => {
          this.$refs.main.initalizeComponentArraysOnLoad();
          this.validatePortfolioComponents();
        }, 100);

      } catch (err) {
        /* if the JSON parse fails, the user is redirected back to the home screen as a fallback
        (hopefully doesn't happen, but better than completely crashing) */
        alert('An Issue Has Occured, We Apologize :(');
        console.error(err);
        localStorage.removeItem('userData');
        this.$router.push('/');
      }
      return;
    }

    /* distingushed between edit and create routes incl. pulling relevant editable user data */
    if (this.$route.params?.user) {
      /* check if user is autheticated here when auth is implemented */
      this.editMode = true;
      const portfolioData = await DatabaseServices.getUserByUsername(this.$route.params.user);
      // if (portfolioData?.error) this.error = portfolioData.error;
      if (!portfolioData) this.error = 'user not found';

      /* sets valid existing portfolio data to user data, editable by the connected sub components */
      this.userData = portfolioData.portfolioItem;
      this.username = portfolioData.username;

      setTimeout(() => {
        this.$refs.main.initalizeComponentArraysOnLoad();
        this.validatePortfolioComponents();
      }, 100);
      
      this.showIntro = false;
    }

  },
  mounted() {
    this.$watch(() => this.$refs.main.editComponentView, (value) => {
      this.showToolbar = !value;
    })
  },
  methods: {
    updateComponentData({ componentType, content }) {
      this.userData[componentType].content = content;
      this.validatePortfolioComponents();
      this.$forceUpdate();
    },
    validatePortfolioComponents() {
      // validatePortolio takes a complete portfolio object 
      // and returns an array containing string names of all invalid components
      this.invalidComponents = validatePortfolio(this.userData);
    },
    sendUserToPreview() {
      localStorage.userData = JSON.stringify(this.userData);
      this.$router.push({ name: 'PortfolioDisplayPreview', params: { data: this.userData }});
    },
    updatePortfolioRemote() {
      if (this.$route.params?.user) {
        DatabaseServices.updatePorfolio(this.$route.params.user, this.userData)
      } else {
        alert("I'm not sure what users' info needs to be updated...")
      }
      this.$router.push('/');
    },
    createPortfolioRemote() {
      
      this.$forceUpdate();

      DatabaseServices.postPortfolio({
        username: this.username,
        portfolioItem: this.userData
      });
      
      this.$router.push('/');
    }
  }
}
</script>