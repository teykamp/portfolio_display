<template>
  <div>
    <Actions
      :sections="sections"
      :currentSection="currentSection"
      @updateCurrentSection="currentSection = $event"
    />
    <transition :name="`slide-${transitionDirection}`">
      <component 
        :is="currentSection"
        @updateCurrentSection="currentSection = $event"
      />
    </transition>
  </div>
</template>

<script>
import Actions from '../components/HomeComponents/ActionButtons.vue'
import welcome from '../components/HomeComponents/WelcomeSection.vue'
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
    welcome
  },
  data() {
    return {
      username: localStorage.username,
      sections: [
        'welcome',
        'build',
        'explore',
        'register'
      ],
      currentSection: 'welcome',
      transitionDirection: 'down'
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
  },
  watch: {
    currentSection(newValue, oldValue) {
      let oldValueIndex = this.sections.indexOf(oldValue);
      let newValueIndex = this.sections.indexOf(newValue);
      this.transitionDirection = oldValueIndex > newValueIndex ? 'up' : 'down';
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
  transition: all 1250ms;
  position: fixed;
}
.slide-up-leave-to, .slide-down-enter {
  transform: translateY(100vh);
}
</style>
