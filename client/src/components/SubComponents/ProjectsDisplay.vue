<template>
  <div>
    <h1>Projects:</h1>
    <p>{{ relevantInfo }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'relevantInfo'
  ]
}
</script>

<style scoped>
  div {
    background-color: rgb(219, 169, 30);
  }
</style>