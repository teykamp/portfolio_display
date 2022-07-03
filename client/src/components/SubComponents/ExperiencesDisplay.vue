<template>
  <div>
    <h1>Experiences:</h1>
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
    background-color: rgb(189, 29, 162);
  }
</style>