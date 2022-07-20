<template>
  <div style="width: 100vw; height: 50vh;">
    {{ relevantInfo }}
  </div>
</template>

<script>
export default {
  props: ['relevantInfo']
}
</script>

<style scoped>
  div {
    background-color: red;
  }
</style>