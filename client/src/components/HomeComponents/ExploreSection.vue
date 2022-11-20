<template>
  <div class="background-matte">
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
              v-model.trim="searchQuery"
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
      if (this.searchQuery) {
        this.$router.push(`/display/${this.searchQuery}`);
      }
    }
  }
}
</script>

<style scoped>
  .background-matte {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #67AC5B;
  }
</style>