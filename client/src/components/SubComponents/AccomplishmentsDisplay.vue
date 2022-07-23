<template>
  <div>

    <div class="center">
      <h3 class="mt-6">Accomplishments</h3>
    </div>  
    <v-container class="pa-0 mb-16 mt-8">
      <v-col  xl="6" lg="8" md="12" sm="12" xs="12">
        <v-card 
          tile
          outlined
        >
          <v-carousel
            :cycle="cycle"
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            class="mt-6"
          >
            <v-carousel-item
              v-for="accomplishment in relevantInfo"
              :key="accomplishment.title"
            >
              <v-sheet height="100%">
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-card
                    width="60%"
                    height="100%"
                    class="overflow-hidden"
                  >
                    <v-system-bar color="accent"></v-system-bar>
                    <v-card-title>
                      {{ accomplishment.title }}
                    </v-card-title>
                    <v-card-subtitle>
                      <div v-if="accomplishment.date">
                        <v-icon>mdi-calendar</v-icon>
                        {{ accomplishment.date }}
                      </div>
                      <v-icon>mdi-office-building-marker</v-icon>
                      {{ accomplishment.organization }}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                      <v-card-text>
                        {{ accomplishment.description }}
                      </v-card-text>
                  </v-card>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <v-container>
            <v-switch
              v-model="cycle"
              label="Cycle Slides"
              inset
            ></v-switch>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  props: [
    'relevantInfo'
  ],
  data: () => {
    return {
      cycle: true,
    }
  },
}
</script>