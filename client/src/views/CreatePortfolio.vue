<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Main from '../components/CreateComponents/CreateMain.vue'

export default {
  components: {
    Main
  },
  created() { 
    window.onbeforeunload = () => {
      return "Are you sure you want to leave? Changes may not have been saved."
    }
  }
}
</script>