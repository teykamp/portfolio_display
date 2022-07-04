<template>
  <div>

    <!-- Error With Profile Display -->
    <div v-if="error">
      <Error :errorType="error" :username="this.user.name" />
    </div>

    <!-- Porfolio Display -->
    <div v-else>

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

    this.user = await DatabaseServices.getUserByUsername(this.$route.params.user);

    // There has been an issue connecting with our servers, this may be an internet connectivity issue.
    if (!this.user) return this.error = 'no server conection';
    // "user not found"
    if (this.user?.error) return this.error = this.user.error;
    // This portfolio has been marked as private, contact ${this.user.name} to gain access!
    if (!this.user.visibility) return this.error = 'account set private';

    this.componentArray = parseProfileData(this.user);

    this.headerData = {
      name: this.user.name,
      headshotURL: this.user.headshotURL,
      professionalTitle: this.user.professionalTitle
    }

    this.footerData = {
      disclaimer: 'Legal Disclaimer, and Stuff...'
    }

  },
  data: () => {
    return {
      componentArray: [],
      headerData: {},
      footerData: {},      
      user: undefined,
      error: undefined
    }
  }
}
</script>


