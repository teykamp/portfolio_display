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
        <Main 
        @update-component-data="updateComponentData($event)"
        :userData="userData"
        />
      </div>

      <!-- <b-button v-on:click="showIntro = !showIntro">Toggle Intro/Main</b-button>
      <b-button variant="primary" @click="sendUserToPreview()">Preview Your Portfolio</b-button> -->

      <!-- <pre>{{ userData }}</pre> -->
      
    </div>
  </div>
</template>

<script>
import Intro from '../components/CreateComponents/CreateIntro.vue'
import Main from '../components/CreateComponents/CreateMain.vue'
import Error from '../components/ErrorDisplay.vue'
import DatabaseServices from '../DatabaseServices.js'

export default {
  components: {
    Main,
    Intro,
    Error
  },
  data: () => {
    return {
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
  methods: {
    updateComponentData(dataObject) {
      this.userData[dataObject.componentType].content = dataObject.content;
      this.$forceUpdate()
    },
    sendUserToPreview() {
      localStorage.userData = JSON.stringify(this.userData);
      this.$router.push({ name: 'PortfolioDisplayPreview', params: { data: this.userData }});
    }
  }
}
</script>