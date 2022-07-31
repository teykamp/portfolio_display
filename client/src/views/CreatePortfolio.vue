<template>
  <div>
    <Main
      ref="main"
      @validate="validatePortfolioComponents()"
      :userData="userData"
      :invalidComponents="invalidComponents"
    />
  </div>
</template>

<script>
import Main from '../components/CreateComponents/CreateMain.vue'
import DatabaseServices from '../DatabaseServices.js'

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
        if (this.$route.params?.user) this.editMode = true;
        setTimeout(() => {
          this.$refs.main.initalizeComponentArraysOnLoad();
          this.validatePortfolioComponents();
        }, 100);
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
  methods: {
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