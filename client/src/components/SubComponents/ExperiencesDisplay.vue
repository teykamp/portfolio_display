<template>
  <div>
    <v-container class="mt-16 pt-16">
      <v-row justify="center">
        <v-sheet 
          class="overflow-hidden"
          max-height="1500"
          color="white"
        >
          <v-row no-gutters>
            <v-col cols="1">
              <v-container 
                fill-height 
                class="d-flex align-end"
              >
                <v-spacer></v-spacer>
              <!-- Sidebar Left -->
                <v-sheet
                  tile 
                  width="20"
                  class="mt-1 mb-8"
                  :hidden="$vuetify.breakpoint.smAndDown"
                >
                  <v-system-bar
                    color="secondary"
                    dark
                    :height="50 * data.length + 20"
                  >
                  </v-system-bar><v-system-bar
                    color="primary"
                    dark
                    :height="50 * data.length + 20"
                  ></v-system-bar>
                </v-sheet>
              </v-container>
            </v-col>
            <v-col>
              <!-- Main Content -->
              <v-card
                min-width="400"
                max-width="1200"
                class="ma-1"
                overflow="hide"
                flat
              >
                <v-system-bar 
                  color="primary" 
                  dark 
                  height="80"
                >
                  <v-spacer></v-spacer>
                  <v-card-title class="text-h5">Experience</v-card-title>
                  <v-spacer></v-spacer>
                </v-system-bar>
                <v-container fill-height>
                  <v-col justify="left" class="align-top">
                    <v-card 
                      tile
                      flat
                      v-for="experience in data.slice(0, 4)" 
                      :key="experience.title"
                    >
                      <v-card-title> {{ experience.title }} </v-card-title>
                      <v-card-subtitle>
                        <v-icon v-if="experience.date">mdi-calendar</v-icon>
                        <strong v-if="experience.date"> {{ dateDisplay(experience.date) }} </strong>
                        <v-icon>mdi-map-marker</v-icon>
                        {{ experience.company }} 
                      </v-card-subtitle>
                      <v-card-text> {{ experience.description }} </v-card-text>
                      <v-divider></v-divider>
                    </v-card>
                  </v-col>
                </v-container>
              </v-card>
            </v-col>

            <!-- Spacer Content -->
            <v-col cols="1">
              <v-sheet 
                width="20"
                tile 
                class="mt-1"
              ></v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dateDisplay from "../../utils/DateToText.ts"
import ComponentMixin from './componentDisplayMixin'

export default {
  mixins: [
    ComponentMixin
  ],
  data() {
    return {
      dateDisplay,
    }
  }
}
</script>

<style scoped>
  @import url('../../UniversalStyles.css');

  .divider {
    z-index: 10;
  }
</style>