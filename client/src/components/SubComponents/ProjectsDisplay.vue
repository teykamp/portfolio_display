<template>
  <div>
      <v-container 
        fluid 
        fill-height
        class="mt-10"
      >
        <h4 class="mb-6">Projects</h4>
        <v-row justify="center">
          <v-sheet
            v-for="project in relevantInfo" 
            :key="project.name"
            class="ma-6"
          >
          <v-card
            hover
            width="400"
            height="500"
          >
            <v-system-bar
              color="primary"
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
              <div v-if="project.description.length > 300 || project.technologies.length > 2">
                <template>
                  <div class="text-center">
                    <v-dialog
                      v-model="dialog"
                      width="800"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="project.linkToRepo"
                          icon
                          color="primary"
                          small
                          fab
                          absolute
                          left
                          bottom
                          v-bind="attrs"
                          v-on="on"
                          class="moreButton"
                        >
                          MORE
                        </v-btn>
                      </template>

                      <v-card>
                        <v-system-bar
                          color="primary"
                          dark
                          height="10"
                        >
                        </v-system-bar>
                        <v-card
                          class="overflow-auto"
                          flex-direction="column"
                          elevation="0"
                        >
                          <v-card-title class="text-h5">
                            {{ project.name }}
                          </v-card-title>

                          <v-card-text>
                            {{ project.description }}
                          </v-card-text>
                        </v-card>

                        <TechnologyDisplay :technologies="project.technologies" :maxTechnologies="project.technologies.length"/>

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

              <!-- Main Card -->
              <TechnologyDisplay :technologies="project.technologies" :maxTechnologies="2"/>

              <!-- Link Buttons -->
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
          </v-sheet>
        </v-row>
      </v-container>
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

<style scoped>
.moreButton {
  margin-bottom: 20px;
}
</style>