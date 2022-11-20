<template>
  <div>
    <Actions
      :currentSection="currentSection"
      @updateCurrentSection="currentSection = $event"
    />
    <transition name="slide-down">
      <component :is="currentSection" />
    </transition>
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
.slide-up-enter, .slide-down-leave-to {
  transform: translateY(-100vh);
}
.slide-up-enter-to, .slide-up-leave-from, .slide-down-enter-to, .slide-down-leave-from {
  transform: translateY(0);
}
.slide-up-enter-active, .slide-up-leave-active, .slide-down-enter-active, .slide-down-leave-active {
  transition: all 1500ms;
  position: fixed;
}
.slide-up-leave-to, .slide-down-enter {
  transform: translateY(100vh);
}
</style>
