<template>
  <div>
    <div class="center">
      <h3>Lets get started with the basics:</h3>
      <input type="text" placeholder="Name" v-model="$parent.userData.name" />
      <input type="text" placeholder="Link to Headshot Image" v-model="$parent.userData.headshotURL" />
      <input type="text" placeholder="ProfessionalTitle" v-model="$parent.userData.professionalTitle" />
      <b-button v-on:click="$parent.showIntro = false">Continue</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style scoped>
input {
  border: 2px solid black;
  margin: 1%;
}
</style>