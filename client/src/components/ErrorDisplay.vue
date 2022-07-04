<template>
  <div>

    <div v-if="userError === 'no server conection'">
      <h1>There has been an issue connecting with our servers, this may be an internet connectivity issue.</h1>
    </div>

    <div v-else-if="userError === 'user not found'">
      <h1>User not Found</h1>
    </div>

    <div v-else-if="userError === 'account set private'">
      <h1>This portfolio has been marked as private, contact {{ username }} to gain access!</h1>
    </div>

  </div>
</template>

<script>
export default {
  props: [
    'userError',
    'username',
  ],
  created() {

  },
  data: () => {
    return {
      errorMsg: ''
    }
  }
}
</script>

<style>


</style>

