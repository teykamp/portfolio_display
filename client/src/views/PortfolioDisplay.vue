<template>
  <div>

    <!-- Error With Profile -->
    <div v-if="error">
      <Error 
        :errorType="error"
        :username="'Add Username Here'" 
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
    if (this.$route.fullPath.includes('preview') && this.$store.state.portfolioItem) {
      this.previewMode = true;
      return this.formatDataForDisplay(this.$store.state.portfolioItem);
    // catched edge case were someone tries to manually enters preview route without info being stored
    } else if (this.$route.fullPath.includes('preview')) {
      alert('There seems to be nothing here to preview!');
      this.$router.push('/');
    }

    const response = await DatabaseServices.getPortfolioByUsername(this.$route.params.user);

    // There has been an issue connecting with our servers, this may be an internet connectivity issue.
    // this may also be triggered if the user does not exist in this version
    if (!response) return this.error = 'user not found';

    // This portfolio has been marked as private, contact ${this.user.name} to gain access!
    if (!response.portfolioItem.visibility) return this.error = 'account set private';

    this.formatDataForDisplay(response.portfolioItem);
    
  },
  data: () => {
    return {
      componentArray: [],
      headerData: {},
      footerData: {},      

      error: undefined,
      previewMode: false,
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


