<template>
  <div>

    <div v-if="showIntro">
      <Intro />
    </div>

    <div v-else>
      <Main />
    </div>

    <b-button v-on:click="showIntro = !showIntro">Toggle Intro/Main</b-button>
  </div>
</template>

<script>
import Intro from '../components/CreateComponents/CreateIntro.vue'
import Main from '../components/CreateComponents/CreateMain.vue'

export default {
  components: {
    Main,
    Intro
  },
  data: () => {
    return {
      showIntro: true,
      userData: {
        name: '',
        headshotURL: '',
        professionalTitle: '',
        visibility: true
      }
    }
  }
}
</script>