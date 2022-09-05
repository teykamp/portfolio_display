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
    /* prompts browser to warn user before closing tab */
    window.onbeforeunload = () => {
      return "Are you sure you want to leave? Changes may not have been saved."
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  }
}
</script>