<template>
  <div>
    <template>
      <v-footer
        dark
        padless
        class="mt-16"
      >
        <v-card
          class="flex"
          flat
          tile
          color="primary"
        >
          <v-container class="pt-8">
            <v-img
              width="40"
              height="40"
              aspect-ratio="1"
              contain
              :src="data.logo"
            ></v-img>
          </v-container>
          <v-card-text class="white--text text-center">
            <strong> &copy; {{ new Date().getFullYear() }} </strong>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="caption">Version</div>
            <v-btn
              color="white"
              text
              rounded
              outlined
              x-small
              :href="data.githubSource"
            >
              {{ data.version }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-footer>
    </template>
  </div>
</template>

<script>
export default {
  props: [
    'data'
  ],
  data: () => ({
    
  }),
}
</script>