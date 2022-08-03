<template>
  <v-sheet color="red" style="color: white;">
    <v-icon x-large color="white" class="pl-5 py-5">mdi-wrench</v-icon>
    <div class="px-7 pb-5">
      <div style="font-weight: bold" class="text-h2">
        Build
      </div>
      <v-divider></v-divider>
      <div style="font-size: 25pt;">
        <ul>
          <li>Building a stunning portfolio to display what you have accomplished has never been easier.</li>
          <li>Add information about yourself, drag and drop each component into place.</li>
          <li>Easily share what you have built with others by sending them a link!</li>
        </ul>
      </div>
      <div>
        <v-btn 
          color="white" 
          class="mr-2"
          @click.stop="goToCreate"
        >
          <v-icon class="mr-2">mdi-clipboard-edit</v-icon>
          Get started
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  methods: {
    goToCreate() {
      window.scrollTo(0, 0);
      this.$router.push('/create');
    }
  }
}
</script>