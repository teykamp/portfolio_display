<template>
  <div>
    <h1>Accomplishments:</h1>
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

  @import url('../../UniversalStyles.css');

  div {
    background-color: blueviolet;
  }
</style>