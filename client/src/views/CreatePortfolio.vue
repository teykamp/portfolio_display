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

          <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
            <v-icon @click.stop="$router.push('/')">mdi-chevron-left</v-icon>
            <span style="font-weight: bold; font-size: 15pt;" class="ml-1">My Portfolio</span>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" color="primary" @click="sendUserToPreview()">
              <v-icon class="mr-2">mdi-file-eye-outline</v-icon>
              Preview
            </v-btn>
            <Steps />
            <v-btn class="ml-2" color="amber" @click.stop="editMode ? updatePortfolioRemote() : createPortfolioRemote()">
              {{ editMode ? 'Save' : 'Create' }}
            </v-btn>
          </v-toolbar>

          <div style="width: 100vw; height: 10vh;"></div>
          
        </div>

        <Main
        ref="main"
        @update-component-data="updateComponentData($event)"
        :userData="userData"
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
import Steps from '../components/CreateComponents/CreateSubComponents/StepByStep.vue'
import DatabaseServices from '../DatabaseServices.js'
import validatePortfolio from '../utils/ValidatePortfolio'

export default {
  components: {
    Main,
    Intro,
    Error,
    Steps
  },
  data: () => {
    return {
      showToolbar: true,
      error: false,
      showIntro: false,
      editMode: false,
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
      if (portfolioData?.error) this.error = portfolioData.error;
      if (!portfolioData) this.error = 'user not found';

      /* sets valid existing portfolio data to user data, editable by the connected sub components */
      this.userData = portfolioData;
      this.showIntro = false;
    }
  },
  mounted() {
    this.$watch(() => this.$refs.main.editComponentView, (value) => {
      this.showToolbar = !value;
    })

    setTimeout(() => alert(validatePortfolio(this.userData)), 4000)
  },
  methods: {
    updateComponentData(dataObject) {
      this.userData[dataObject.componentType].content = dataObject.content;
      this.$forceUpdate();
    },
    sendUserToPreview() {
      localStorage.userData = JSON.stringify(this.userData);
      this.$router.push({ name: 'PortfolioDisplayPreview', params: { data: this.userData }});
    },
    updatePortfolioRemote() {
      if (this.$route.params?.user) {
        alert(`${this.$route.params.user}s portfolio has been updated in the database`)
      } else {
        alert("I'm not sure what users' info needs to be updated...")
      }
      this.$router.push('/');
    },
    createPortfolioRemote() {
      alert('Portfolio Has Been Created!');
      this.$router.push('/');
    }
  }
}
</script>