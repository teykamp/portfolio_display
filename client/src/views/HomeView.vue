<template>
  <div class="center">
    <h1>Search Profile Here</h1>
    <input type="text" placeholder="Name of User" v-model="query" v-on:keyup.enter="$router.push(`/display/${query}`)" style="border: 1px solid black" />
    <h1>Want to make your own <i>snazzy</i> portfolio? Look no further!</h1>
    <b-button variant="primary" style="color: white;" v-on:click="handleCreate()">Build Portfolio Now</b-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HomeView',
    data: () => {
      return {
        query: ''
      }
    },
    methods: {
      handleCreate() {
        this.$router.push("/create");
      }
    }
  })
</script>

<style scoped>
  @import url('../UniversalStyles.css');
</style>
