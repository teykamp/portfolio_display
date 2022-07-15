<template>
  <div>
  <h1>Projects</h1>
      <v-container 
        fluid 
        fill-height
      >
        <v-row>
          <v-col
            v-for="project in relevantInfo" 
            :key="project.name"
            class="d-flex justify-space-around mb-6"
          >
          <v-card
            hover
            width="400"
            height="500"
          >
            <v-system-bar
              color="indigo darken-2"
              dark
              height="10"
            >
            </v-system-bar>
              <v-card-title>
                {{ project.name }}
              </v-card-title> 
            <v-card
              height="145"
              class="overflow-hidden"
              flex-direction="column"
              elevation="0"
            >
              <v-card-text>
                {{ project.description }}
              </v-card-text>
            </v-card>

              <!-- Expand Card -->
              <div v-if="project.description.length > 300">
                <template>
                  <div class="text-center">
                    <v-dialog
                      v-model="dialog"
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="project.linkToRepo"
                          icon
                          color="indigo"
                          small
                          fab
                          absolute
                          right
                          middle
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-system-bar
                          color="indigo darken-2"
                          dark
                          height="10"
                        >
                        </v-system-bar>
                        <v-card-title class="text-h5">
                          {{ project.name }}
                        </v-card-title>

                        <v-card-text>
                          {{ project.description }}
                        </v-card-text>

                        <TechnologyDisplay :technologies="project.technologies"/>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="indigo"
                            text
                            @click="dialog = false"
                          >
                            Back
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template> 
              </div>

              <TechnologyDisplay :technologies="project.technologies"/>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  v-if="project.linkToRepo"
                  icon
                  :href="project.linkToRepo"
                >
                  <v-icon>mdi-github</v-icon>
                </v-btn>
                <v-btn
                  v-if="project.linkToDeploy"
                  icon
                  :href="project.linkToDeploy"
                >
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    <p>{{ relevantInfo }}</p>
  </div>
</template>

<script>
import TechnologyDisplay from '../ReusableComponents/ProjectTechnologySheet.vue'
export default {
  props: [
    'relevantInfo'
  ],
  components: {
    TechnologyDisplay,
  },
  data: () => {
    return {
      dialog: false,
    }
  },
}
</script>