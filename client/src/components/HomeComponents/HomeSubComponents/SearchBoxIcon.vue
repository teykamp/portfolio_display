<template>
  <v-btn
    @click.stop="showSearch = true"
    :fab="!showSearch"
    :width="showSearch ? searchBarWidth : ''"
    :height="showSearch ? '70px' : ''"
    color="white"
    style="transition: 250ms; position: absolute;"
  >
    <v-icon 
      v-if="!showSearch"
      dark 
    >
      mdi-magnify
    </v-icon>
    <div 
      v-else 
      class="button-container"
    >
      <div>
        <v-icon 
          dark 
          @click.stop="showSearch = false"
          class="mx-2"
        >mdi-chevron-left</v-icon>
      </div>
      <!-- Form is there to make mobile keyboards know to turn 'return' into 'go/search' -->
      <div style="width: 100%;">
        <form 
          @submit="(ev) => ev.preventDefault()"
          action
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
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
</style>