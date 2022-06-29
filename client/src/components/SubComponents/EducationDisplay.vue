<template>
  <div>
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
    background-color: rgb(29, 189, 69);
  }
</style>