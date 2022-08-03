<template>
  <div>
    <div class="header pa-2" elevation="40" :style="`background-color: rgba(255, 255, 255, ${barWhiteness});`"> 
      <v-btn text>Build</v-btn>
      <v-btn text>Register</v-btn>
      <v-btn text>Explore</v-btn>
    </div>
    <v-container fill-height fluid>
      <v-row>
        <v-img position="absolute" width="100vw" src="../assets/LandingPage/smilingman2.jpeg" />
        <h1 position="relative" class="text-h1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam laboriosam similique nostrum voluptate neque officiis doloribus quo, vitae qui optio consequatur porro, cupiditate in illo? Eum asperiores cupiditate quas sit vel at consectetur iure, fuga libero nulla quam ullam. Ex dolorum velit dolore expedita nobis voluptate esse deleniti assumenda? Quaerat veniam rerum hic quisquam sed, officiis corporis, incidunt saepe nulla accusantium quos totam eaque. Laboriosam iure velit quidem. Illo dolorem illum nulla eligendi quaerat nam facere culpa est voluptates sunt distinctio neque iste enim molestiae eius dicta nostrum, maxime quis! Nulla earum modi soluta deserunt delectus doloremque facere ipsam vel.</h1>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data: () => {
    return {
      query: '',
      barWhiteness: 0
    }
  },
  mounted() {
    document.addEventListener('scroll', this.adjustTopBar);
  },
  destroyed() {
    document.removeEventListener('scroll');
  },
  methods: {
    adjustTopBar() {
      this.barWhiteness = window.scrollY / 400
      
    },
    handleCreate() {
      this.$router.push("/create");
    },
    async login() {
      const googleUser = await this.$gAuth.signIn();
      console.log(googleUser)
    }
  }
}
</script>

<style scoped>
  @import url('../UniversalStyles.css');
  .header {
    position: fixed;
    z-index: 2;
    width: 100vw;
  }
</style>
