<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style>
  p {
    margin: 0px;
    padding: 0%;
  }
</style>
