<template>
  <div class="scrollmenu">
    <div
      v-for="technology in technologies.slice(0, maxTechnologies)" 
      :key="technology.name"
    >
      <div class="px-9 mb-2">
        <v-img
          :src="require(`../../assets/techLogos/${techKeys[technology.name]}`)"
          contain
          width="120"
          aspect-ratio="1"
        ></v-img>
        <h5 class="mt-5" style="text-align: center">{{ technology.name }}</h5>
      </div>
      
    </div>
  </div>
</template>

<script>
import techKeys from '../../assets/techKeys'

export default {
  props: [
    'technologies',
    'maxTechnologies',
  ],
  data() { 
    return { 
      techKeys 
    }
  }
}
</script>

<style scoped>
div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}

div.scrollmenu div {
  display: inline-block;
  text-decoration: none;
}
</style>