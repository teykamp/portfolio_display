<template>
  <!-- COMPONENT CODE NOT IN USE -->
  <div>
    <div class="center">

      <div v-if="$parent.editMode">
        <h3>Edit the basics:</h3>
      </div>

      <div v-else>
        <h3>Lets get started with the basics:</h3>
      </div>
      
      <input type="text" placeholder="Name" v-model="$parent.userData.name" />
      <input type="text" placeholder="Link to Headshot Image"   v-model="$parent.userData.headshotURL" />

      <img id="headshotImg" style="position: fixed; opacity: 0" @load="loaded" @error="error" :src="$parent.userData.headshotURL" alt="Image URL Not Valid">
      <div class="center" v-if="imgLoaded">
        <h4>Image Preview:</h4>
        <img id="headshotImg" :src="$parent.userData.headshotURL" alt="Image URL Not Valid"> 
      </div>
      <div v-else>
        <h3>Image Link Provided Does Not Work!</h3>
      </div>

      <input type="text" placeholder="ProfessionalTitle" v-model="$parent.userData.professionalTitle" />

      <b-button v-on:click="$parent.showIntro = false">Continue</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      imgLoaded: true
    }
  },
  created() {
    
  },
  methods: {
    error() {
      this.imgLoaded = false
    },
    loaded() {
      this.imgLoaded = true;
    }
  }
}
</script>

<style scoped>
input {
  border: 2px solid black;
  margin: 1%;
}
</style>