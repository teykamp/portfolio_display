<template>
  <div>
    <Actions
      :currentSection="currentSection"
      @updateCurrentSection="currentSection = $event"
    />
    <component :is="currentSection" />
  </div>
</template>

<script>
import Actions from '../components/HomeComponents/ActionButtons.vue'
import landing from '../components/HomeComponents/LandingSection.vue'
import register from '../components/HomeComponents/RegisterSection.vue'
import build from '../components/HomeComponents/BuildSection.vue'
import explore from '../components/HomeComponents/ExploreSection.vue'

export default {
  name: 'HomeView',
  components: {
    Actions,
    register,
    build,
    explore,
    landing
  },
  data() {
    return {
      currentSection: 'landing',
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
