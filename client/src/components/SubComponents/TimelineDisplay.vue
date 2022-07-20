<template>
  <div>
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