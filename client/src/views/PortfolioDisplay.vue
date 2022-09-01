<template>
  <div>

    <!-- Error With Profile -->
    <div v-if="error">
      <Error 
        :errorType="error"
        :username="$route.params.user" 
      />
    </div>

    <!-- Porfolio Display -->
    <div v-else>

      <v-row
        style="
        z-index: 2;
        top: 10px;
        position: fixed;"
        class="ml-1"
      >  
        <v-btn
          text
          @click="back"
        >Back</v-btn>
        <v-btn
          v-if="canEditPortfolio"
          text
          @click="$router.push({ name: 'Build' })"
        >Edit</v-btn>
      </v-row>

      <div>
        <Header :data="headerData" />
      </div>

      <div v-for="component in componentArray" :key="component.id">
        <component-display-factory 
          :relevantInfo="component.content" 
          :componentType="component.category" 
        />
      </div>

      <div>
        <Footer :data="footerData" />
      </div>

    </div>

  </div>
</template>

<script>
import ComponentDisplayFactory from '../components/ComponentDisplayFactory.vue'
import DatabaseServices from '../DatabaseServices'
import parseProfileData from '../utils/ParseProfileData'
import Error from '../components/ErrorDisplay.vue'
import Header from '../components/PortfolioHeader.vue'
import Footer from '../components/PortfolioFooter.vue'

export default {
  components: {
    ComponentDisplayFactory,
    Error,
    Header,
    Footer
  },
  async created() {

    // HANDLES PREVIEW MODE
    // if true, loads preview mode
    if (this.$route.fullPath.includes('preview') && this.$store.state.portfolioItem) {
      this.previewMode = true;
      return this.formatDataForDisplay(this.$store.state.portfolioItem);
    // catched edge case were someone tries to manually enters preview route without info being stored
    } else if (this.$route.fullPath.includes('preview')) {
      this.$store.state.snackbarText = 'There seems to be nothing to preview!';
      this.$router.push('/');
    }

    // CHECKS IF A USER EXISTS
    try {
      const isTaken = await DatabaseServices.isUsernameTaken(this.$route.params.user);
      if (!isTaken) return this.error = 'user not found';
    } catch (err) {
      return this.catchClause(err);
    }

    // CHECKS THE PRIVACY SETTINGS OF THAT USER
    try {
      const privacySettings = await DatabaseServices.getPortfolioPrivacyByUsername(this.$route.params.user);
      // This portfolio has been marked as private, contact ${this.user.name} to gain access!
      if (!privacySettings.visibility) {
        // no accesskey should always return null, while no query param should always return undefined
        if (privacySettings.accesskey !== this.$route.query.accesskey) {
          return this.error = 'account set private';
        }
      }
    } catch (err) {
      return this.catchClause(err);
    }

    // PULLS DOWN ACTUAL PORTFOLIO DATA ONCE PRIVACY SCREENING HAS PASSED
    try {
      const portfolioItem = await DatabaseServices.getPortfolioContentByUsername(this.$route.params.user);
      if (portfolioItem?.error) this.error = portfolioItem.error
      this.formatDataForDisplay(portfolioItem);
    } catch (err) {
      return this.catchClause(err);
    }

    
  },
  data() {
    return {
      componentArray: [],
      headerData: {},
      footerData: {},      

      error: undefined,
      previewMode: false,
    }
  },
  metaInfo() {
    return {
      title: `${this.$route.params.user}`,
      meta: [
        {
          property: "og:type",
          content: "website"
        },
        { 
          property: "og:url", 
          content: `http://portfolio-display-app.herokuapp.com/${this.$route.params.user}` 
        },
        { 
          property: "og:title", 
          content: `${this.$route.params.user} | Take A Look At My Popout™ Portfolio`
        },
        { 
          property: "og:description", 
          content: `${this.$route.params.user} wants to share the portfolio they built on Popout™ Portfolio with you!` 
        }
      ]
    }
  },
  computed: {
    canEditPortfolio() {
      return this.$route.params.user === localStorage.getItem('username') && !this.previewMode;
    }
  },
  methods: {
    back() {
      history.back();
    },
    catchClause(error) {
      this.$store.state.snackbarText = 'Cannot connect to server';
      this.error = 'no server conection';
      console.warn(error);
    },
    formatDataForDisplay(userData) {

      /* sorts data into seperate categories for passing down sub-component specific info */

      this.componentArray = parseProfileData(userData);
      this.headerData = userData.header;

      this.footerData = {
        disclaimer: 'Legal Disclaimer, and Stuff...',
        version: '0.1.0',
        githubSource: 'https://github.com/teykamp/portfolio_display',
        logo: 'https://avatars.githubusercontent.com/u/46391052?s=120&v=4',
      }
    },
    async getHeadshotImgForMetadata() {
      const portfolioContent = await DatabaseServices.getPortfolioContentByUsername(this.$route.params.user);
      return portfolioContent.header.headshotURL;
    }
  }
}
</script>


