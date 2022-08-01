<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Main from '../components/CreateComponents/CreateMain.vue'
import DatabaseServices from '../DatabaseServices.ts'

export default {
  components: {
    Main
  },
  async created() {

    /* checks if user is being redirected back from preview mode */
    if (localStorage?.userData) {
      try {
        this.userData = JSON.parse(localStorage.userData);
        this.showIntro = false;
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
      
    }

  },
 
}
</script>