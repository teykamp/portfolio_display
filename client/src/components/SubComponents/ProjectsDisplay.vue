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
            v-for="project in data" 
            :key="project.name"
            class="ma-6"
          >
          <v-card
            hover
            :width="$vuetify.breakpoint.xs ? 325 : 450"
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
              class="overflow-hidden px-4 mb-5"
              flex-direction="column"
              elevation="0"
            >
              <!-- Truncates text after 100th character -->
              <div style="min-height: 90px">
                {{ `${
                    project.description.substring(0, 100)
                  }${
                    project.description.length > 100 ? '...' : ''
                  }` }}
              </div>
            </v-card>

              <!-- Main Card -->
              <TechnologyDisplay 
                :technologies="project.technologies" 
                :maxTechnologies="1"
              />

              <!-- Link Buttons -->
              <v-card-actions class="mt-8">
                <v-btn
                  v-if="project.description > 100 || project.technologies.length > 1"
                  @click.stop="selectedProject = project; moreDialog = true"
                  color="primary"
                  small
                  text
                >
                  MORE
                </v-btn>
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

      <v-dialog
        v-model="moreDialog"
        width="800"
      >
        <v-card>
          <v-system-bar
            color="primary"
            dark
          >
          </v-system-bar>
          <v-card
            class="overflow-auto"
            flex-direction="column"
            elevation="0"
          >
            <v-card-title class="text-h5">
              {{ selectedProject.name }}
            </v-card-title>

            <v-card-text>
              {{ selectedProject.description }}
            </v-card-text>
          </v-card>

          <TechnologyDisplay 
            :technologies="selectedProject.technologies" 
            :maxTechnologies="selectedProject.technologies.length"
          />

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo"
              text
              @click="moreDialog = false"
            >
              Back
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import TechnologyDisplay from '../ReusableComponents/ProjectTechnologySheet.vue'
import ComponentMixin from './componentDisplayMixin'

export default {
  mixins: [
    ComponentMixin
  ],
  components: {
    TechnologyDisplay,
  },
  data: () => {
    return {
      moreDialog: false,
      selectedProject: {
        name: 'undefined',
        desciption: 'undefined',
        technologies: []
      }
    }
  }
}
</script>