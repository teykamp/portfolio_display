<template>
  <v-sheet color="green" style="color: white;">
    <v-icon x-large color="white" class="pl-5 py-5">mdi-map</v-icon>
    <div class="px-7 pb-5">
      <div style="font-weight: bold" class="text-h2">
        Explore
      </div>
      <v-divider></v-divider>
      <div style="font-size: 25pt;">
        <ul>
          <li>Look up others users' portfolios.</li>
          <li>Find ideas and get inspired.</li>
          <li>Learn about others in your field!</li>
        </ul>
      </div>
      <div>
        <v-btn
          :fab="showSearch ? false : true"
          color="white"
          @click="showSearch = true"
          style="transition: 250ms"
          :width="showSearch ? '80vw' : ''"
          :height="showSearch ? '10vh' : ''"
        >
          <v-icon dark v-if="!showSearch">
            mdi-magnify
          </v-icon>
          <v-row v-else>
            <v-icon 
              dark 
              @click.stop="showSearch = false"
              class="mx-2"
            >mdi-chevron-left</v-icon>
            <v-text-field 
              class="mt-3 pr-10"
              label="Search Portfolios"
            />
          </v-row>
          
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false
    }
  }
}
</script>
