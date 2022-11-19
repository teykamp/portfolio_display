<template>
  <div>
    <Actions />
    <Landing />
    <Build />
    <Explore />
    <Register />
  </div>
</template>

<script>
import Actions from '../components/HomeComponents/ActionButtons.vue'
import Landing from '../components/HomeComponents/LandingSection.vue'
import Register from '../components/HomeComponents/RegisterSection.vue'
import Build from '../components/HomeComponents/BuildSection.vue'
import Explore from '../components/HomeComponents/ExploreSection.vue'

export default {
  name: 'HomeView',
  components: {
    Register,
    Build,
    Explore,
    Actions,
    Landing
  },
  data() {
    return {
      currentSection: 0,
      username: localStorage.username
    }
  },
  mounted() {
    // TODO: make this work with new system

    // setTimeout(() => {
    //   if (this.$route.query.to) {
    //     document.getElementById(this.$route.query.to).scrollIntoView();
    //   }
    // }, 50)
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'Auth' });
      setTimeout(() => location.reload(), 25);
    }
  }
}
</script>

<style scoped>
</style>
