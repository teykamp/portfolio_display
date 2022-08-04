<template>
  <div>

    <div 
      class="header pa-2" 
      :style="`background-color: rgba(255, 255, 255, ${barWhiteness}); box-shadow: 0px 0px ${calcShadow()}px`"
    > 
      <v-btn
        :text="currentSection !== 'register'"
        :color="currentSection !== 'register' ? '' : 'info'"
      >Register</v-btn>
      <v-btn 
        :text="currentSection !== 'build'"
        :color="currentSection !== 'build' ? '' : 'error'"
      >Build</v-btn>
      <v-btn 
        :text="currentSection !== 'explore'"
        :color="currentSection !== 'explore' ? '' : 'success'"
      >Explore</v-btn>
    </div>

    <article id="invigorate">
      <v-img position="absolute" width="100vw" src="../assets/LandingPage/smilingman2.jpeg" />
    </article>
    <article id="register" style="background-color: white;" class="content-container">
      <Register />
    </article>
    <article id="build" style="background-color: white;" class="content-container">
      <Build />
    </article>
    <article id="explore" style="background-color: white;" class="content-container">
      <Explore />
    </article>
    <article id="footer" style="height: 50vh" class="content-container"></article>
  
  </div>
</template>

<script>
import Register from '../components/HomeComponents/RegisterSection.vue'
import Build from '../components/HomeComponents/BuildSection.vue'
import Explore from '../components/HomeComponents/ExploreSection.vue'

export default {
  name: 'HomeView',
  data: () => {
    return {
      barWhiteness: 0,
      currentSection: 0,
    }
  },
  components: {
    Register,
    Build,
    Explore
  },
  mounted() {
    document.addEventListener('scroll', this.adjustTopBar);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this.currentSection = entry.target.getAttribute('id')
        }
      })
    }, {
      rootMargin: '0px 0px -93% 0px'
    })

    document.querySelectorAll('article').forEach((section) => {
      observer.observe(section)
    })
  },
  destroyed() {
    document.removeEventListener('scroll', this.adjustTopBar);
  },
  methods: {
    calcShadow() {
      let shadow;
      const maxShadow = 8;
      if ((window.scrollY / 50) < maxShadow) shadow = window.scrollY / 50;
      else shadow = maxShadow;
      return shadow;
    },
    adjustTopBar() {
      this.barWhiteness = window.scrollY / 400;
    },
    handleCreate() {
      this.$router.push("/create");
    },
    // async login() {
    //   const googleUser = await this.$gAuth.signIn();
    //   console.log(googleUser)
    // }
  }
}
</script>

<style scoped>
  @import url('../UniversalStyles.css');
  .header {
    position: fixed;
    z-index: 2;
    width: 100vw;
  }
  .content-container {
    /* height: 75vh; */
  }
</style>
