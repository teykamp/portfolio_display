<template>
  <div>

    <!-- Error With Profile -->
    <div v-if="error">
      <Error :errorType="error" :username="this.user.name" />
    </div>

    <!-- Porfolio Display -->
    <div v-else>

      <div> 
        <b-button v-if="!previewMode" depressed variant="warning" style="color: white; z-index: 10;" class="position-absolute" 
        @click="$router.push(`/edit/${$route.params.user}`)">Edit</b-button>
        <b-button v-else variant="primary" style="color: white;"
        @click="returnFromPreview()">Züruck</b-button>
      </div>

      <div>
        <Header :data="headerData" />
      </div>

      <div v-for="component in componentArray" :key="component.id">
        <component-display-factory :relevantInfo="component.content" :componentType="component.category" />
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

    // if true, loads preview mode
    if (this.$route.params?.data) {
      this.previewMode = true;
      return this.formatDataForDisplay(this.$route.params.data);
    }

    this.user = await DatabaseServices.getUserByUsername(this.$route.params.user);

    // There has been an issue connecting with our servers, this may be an internet connectivity issue.
    if (!this.user) return this.error = 'no server conection';
    // "user not found"
    if (this.user?.error) return this.error = this.user.error;
    // This portfolio has been marked as private, contact ${this.user.name} to gain access!
    if (!this.user.visibility) return this.error = 'account set private';

    this.formatDataForDisplay(this.user);
    
  },
  data: () => {
    return {
      componentArray: [],
      headerData: {},
      footerData: {},      
      user: undefined,
      error: undefined,
      previewMode: false
    }
  },
  methods: {
    returnFromPreview() {
      history.back();
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
    }
  }
}
</script>


