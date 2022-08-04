<template>
  <div class="center">
    <component :is="formType ? 'register' : 'login'" />
  </div>
</template>

<script>
import register from '../components/AuthComponents/RegisterUser.vue'
import login from '../components/AuthComponents/LogIn.vue'

export default {
  components: {
    register,
    login
  },
  data() {
    return {
      formType: true
    }
  }
}
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(100vw);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transition: all 1s;
}
.slide-leave-from {
  transform: translateX(0)
}
.slide-leave-to {
  transform: translateX(-100vw)
}
.slide-leave-active {
  transition: all 1s;
}
</style>