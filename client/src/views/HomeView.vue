<template>
  <div class="center" style="flex-direction: column">
    <h1>Search Profile Here</h1>
    <input type="text" placeholder="Name of User" style="border: 1px solid black" />
    <h1>Want to make your own <i>Snazzy</i> portfolio? Look no further!</h1>
    <b-button>Build Portfolio Now</b-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HomeView',
  })
</script>

<style scoped>
  @import url('../UniversalStyles.css');
</style>
