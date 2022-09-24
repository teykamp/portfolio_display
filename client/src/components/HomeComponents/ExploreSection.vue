<template>
  <v-sheet color="green" style="color: white;">
    <v-icon 
      x-large 
      color="white" 
      class="pl-5 py-5"
    >mdi-map
    </v-icon>
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
          @click.stop="showSearch = true"
          :fab="!showSearch"
          color="white"
          style="transition: 250ms"
          class="pa-0 ma-0"
          :width="showSearch ? searchBarWidth : ''"
          :height="showSearch ? '70px' : ''"
        >

          <v-icon dark v-if="!showSearch">
            mdi-magnify
          </v-icon>

          <div class="button-container" v-else>

            <div style="flex-basis: 1">
              <v-icon 
                dark 
                @click.stop="showSearch = false"
                class="mx-2"
              >mdi-chevron-left</v-icon>
            </div>

            <!-- Form is there to make mobile keyboards know to turn 'return' into 'go/search' -->
            <div style="flex-basis: 10; width: 100%;">
              <form 
                action
                @submit="(ev) => ev.preventDefault()"
              >
                <v-text-field 
                  v-model="searchQuery"
                  @keyup.enter="search()"
                  class="mt-3 pr-10"
                  label="Search Portfolios"
                  type="search"
                />
              </form>
            </div>

          </div>
          
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
      searchQuery: ''
    }
  },
  computed: {
    searchBarWidth() {
      return this.$vuetify.breakpoint.smAndUp ? '400px' : '80vw';
    }
  },
  methods: {
    search() {
      this.searchQuery = this.searchQuery.trim();
      if (this.searchQuery) {
        this.$router.push(`/display/${this.searchQuery}`);
      }
    }
  }
}
</script>

<style scoped>
  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
</style>