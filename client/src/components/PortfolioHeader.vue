<template>
  <div>
    <h1>Header:</h1>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'data'
  ]
}
</script>

<style scoped>
  div {
    background-color: rgb(43, 158, 22);
  }
</style>