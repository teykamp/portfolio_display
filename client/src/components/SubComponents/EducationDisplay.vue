<template>
  <div>
    <h1>Education:</h1>
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
    background-color: rgb(216, 51, 51);
  }
</style>