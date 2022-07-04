<template>
  <div>
    <input type="text" placeholder="Name" v-model="$parent.userData.name" />
    <input type="text" placeholder="Link to Headshot Image" v-model="$parent.userData.headshotURL" />
    <input type="text" placeholder="ProfessionalTitle" v-model="$parent.userData.professionalTitle" />
    <b-button v-on:click="test()">Test</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      alert(this.$parent.userData.professionalTitle)
    }
  }
}
</script>

<style scoped>

</style>