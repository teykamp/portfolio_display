<template>
  <div>
    <v-container 
      fluid
      overflow-auto
    >
      <v-col
        v-for="technology in technologies.slice(0, maxTechnologies)" 
        :key="technology.name"
        class="d-flex justify-space-around mb-6"
      >
        <v-sheet width="160">
          <v-container
            fluid 
            fill-height
          >
            <v-row class="justify-center">
              <v-img
                contain
                max-height="100"
                max-width="100"
                :src="require(`../../assets/techLogos/${techKeys[technology.name]}`)"
                aspect-ratio="1"
              >
              </v-img>
            </v-row>
            <v-row class="justify-center">
              <v-card-title>
                {{ technology.name }}
              </v-card-title>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-container>
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