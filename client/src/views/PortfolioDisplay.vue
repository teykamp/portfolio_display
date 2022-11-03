<template>
  <div>

    <!-- Error With Profile -->
    <div v-if="error">
      <Error :errorType="error" />
    </div>

    <!-- Porfolio Display -->
    <div v-else>
      <v-row
        style="z-index: 2; top: 10px; position: fixed;"
        class="ml-1"
      >  
        <v-btn
          @click="back"
          text
        >Back</v-btn>
        <v-btn
          v-if="canEditPortfolio"
          @click="$router.push({ name: 'Build' })"
          text
        >Edit</v-btn>
      </v-row>

      <DisplayEngine 
        :portfolio="portfolio" 
        :key="Object.keys(portfolio)[0]"
      />

    </div>

  </div>
</template>

<script>
import DisplayEngine from '../components/ReusableComponents/DisplayEngine.vue'
import DatabaseServices from '../DatabaseServices'
import Error from '../components/ErrorDisplay.vue'

export default {
  components: {
    Error,
    DisplayEngine
  },
  async created() {

    // HANDLES PREVIEW MODE
    // if true, loads preview mode
    if (this.$route.fullPath.includes('preview') && this.$store.state.portfolioItem) {
      this.previewMode = true;
      document.title = "Preview - Portfolio";
      return this.portfolio = this.$store.state.portfolioItem;
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
      if (portfolioItem?.error) this.error = portfolioItem.error;
      document.title = `${this.$route.params.user} - Portfolio`;
      this.portfolio = portfolioItem;
    } catch (err) {
      return this.catchClause(err);
    }

    
  },
  data() {
    return {
      error: undefined,
      previewMode: false,
      portfolio: { default: null }
    }
  },
  mounted() {
    
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
    }
  }
}
</script>