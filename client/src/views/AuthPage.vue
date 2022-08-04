<template>
  <div>
    <RegisterUser />
    <LogIn />
  </div>
</template>

<script>
import RegisterUser from '../components/AuthComponents/RegisterUser.vue'
import LogIn from '../components/AuthComponents/LogIn.vue'

export default {
  components: {
    RegisterUser,
    LogIn
  }
}
</script>