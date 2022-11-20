<template>
  <div>

    <!-- Error With Portfolio -->
    <div v-if="error">
      <Error :errorType="error" />
    </div>

    <!-- Porfolio Display -->
    <div v-else>
      <DisplayEngine 
        :portfolio="portfolio" 
      >
        <template #actions>
          <v-btn
            @click.stop="$router.push({ name: 'Home' })"
            text
          >Back</v-btn>
          <v-btn
            v-if="canEditPortfolio"
            @click.stop="$router.push({ name: 'Build' })"
            text
          >Edit</v-btn>
        </template>
      </DisplayEngine>
    </div>

  </div>
</template>

<script>
import DisplayEngine from '../components/ReusableComponents/DisplayEngine.vue'
import Error from '../components/ErrorDisplay.vue'

import DatabaseServices from '../DatabaseServices'

export default {
  components: {
    Error,
    DisplayEngine
  },
  async created() {

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
      portfolio: { default: null }
    }
  },
  mounted() {
    
  },
  computed: {
    canEditPortfolio() {
      return this.$route.params.user === localStorage.getItem('username')
    }
  },
  methods: {
    catchClause(error) {
      this.$store.state.snackbarText = 'Cannot connect to server';
      this.error = 'no server conection';
      console.warn(error);
    }
  }
}
</script>