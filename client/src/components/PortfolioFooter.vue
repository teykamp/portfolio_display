<template>
  <div>
    <h1>Footer:</h1>
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
    background-color: rgb(22, 140, 170);
  }
</style>