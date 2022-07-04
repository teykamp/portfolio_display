<template>
  <div>
    <Intro />
    <Main />
  </div>
</template>

<script>
import Intro from '../components/CreateComponents/CreateIntro.vue'
import Main from '../components/CreateComponents/CreateMain.vue'

export default {
  components: {
    Main,
    Intro
  }
}
</script>