<template>
  <div>

    <div v-if="!techView">

      <Toolbar 
        :title="'Projects'"
        :exitAction="() => $parent.editComponentView = false"
        :onAdd="() => addProject()"
        :listLength="projects.length"
        :disabledAt="12"
      />

      <div v-show="projects.length === 0" style="display: flex; align-items: center; justify-content: center;">
        <v-icon large class="mr-2">mdi-file-code-outline</v-icon>
        <!-- code-json, file-code outline? -->
        <span style="font-size: 16pt">Added Projects Go Here</span>
      </div>
      
      <v-container fill-height fluid>
        <v-row>
          <!-- <TransitionGroup name="list"> -->
          <v-col 
          class="col-sm-12 col-md-6"
          v-for="(project, index) in projects" :key="project.id">
            <v-card>
              
              <div class="pa-4 pt-0">
                
                  <v-row>                    
                    <div class="ml-3 mt-7" v-if="missingInfo(project)">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"                  
                          >
                            mdi-alert
                          </v-icon>
                        </template>
                        <span>Missing required information</span>
                      </v-tooltip>     
                    </div>

                    <v-col cols="10" sm="9">
                      <v-text-field 
                      v-model="projects[index].name" 
                      placeholder="Enter Project Name"
                      style="font-weight: bold; font-size: 18pt;"
                      outlined
                      clearable
                      color="blue"                
                      >{{ projects[index].name }}</v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-hover v-slot="{ hover }">
                      <v-icon large class="mb-7 mr-1" @click="removeProject(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                    </v-hover>
                  </v-row>

                <v-btn class="mb-2" block color="primary" dark @click="techView = true; projectSelected = project">
                  <span>Add Technologies Used ({{ project.technologies.length }})</span>
                  <!-- <v-icon>mdi-file-code-outline</v-icon> -->
                </v-btn>
                <p v-show="project.technologies.length === 0" style="color: red">*At Least 1 Technology Required</p>

                <v-text-field 
                  label="Deployment URL"
                  v-model="projects[index].linkToDeploy">
                </v-text-field>
                <v-text-field 
                  color="orange"
                  label="Repository URL"
                  v-model="projects[index].linkToRepo">
                </v-text-field>
                <v-textarea
                  color="blue"
                  :label="`Add a Description (${projects[index].description.length}/5000)`"
                  no-resize
                  maxlength="5000"
                  v-model="projects[index].description"
                ></v-textarea>

                <Calender
                :providedDate="projects[index].date"
                @date-updated="projects[index].date = $event"
                />
     
              </div>
              
            </v-card>
            
          </v-col>
          <!-- </TransitionGroup> -->
              
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <Toolbar 
        :title="'Technology'"
        :exitAction="() => techView = false"
        :onAdd="() => projectSelected.technologies.push({ name: '', logo: '' })"
        :addBtnColor="'red'"
        :listLength="projectSelected.technologies.length"
        :disabledAt="99"
      />

      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          
          <div v-show="projectSelected.technologies.length === 0">
            <span style="font-size: 16pt">Added Technologies {{ !projectSelected.name ? '' : ` For ${projectSelected.name}` }} Will Go Here!</span>
          </div>

          <v-col 
          v-for="(tech, index) in projectSelected.technologies" :key="tech.id"
          class="col-xs-12 col-sm-6 col-md-4"
          >
            <v-card>
              <div class="pa-3">
                <v-text-field
                  label="Name"
                  v-model="projectSelected.technologies[index].name"
                  :rules="[required]"         
                ></v-text-field>
                <v-text-field
                  label="Logo URL"
                  v-model="projectSelected.technologies[index].logo"
                ></v-text-field>
              </div>
              <div class="center pb-3">
                <v-card-actions>
                  <v-btn
                    @click="projectSelected.technologies.splice(index, 1)" 
                    color="error"
                  >
                    <v-icon>mdi-close</v-icon>
                    <span>Remove</span>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>

        </v-row>
      </v-container>

    </div>

  </div>
</template>

<script>
import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import Calender from '../../ReusableComponents/CreateCalender.vue'
import Project from '../../../utils/PortfolioSchemas/Projects'

export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  components: {
    Toolbar,
    Calender
  },
  created() {
    if (this.userData?.projects?.content) this.projects = this.userData.projects.content;
  },
  destroyed() {
    this.emitData();
  },
  data: () => {
    return {
      projects: [],
      techView: false,
      projectSelected: {},
      required: value => !!value || 'Required.'
    }
  },
  methods: {
    editTechUsed(project) {
      this.projectSelected = project;
      this.techView = true;
    },
    removeProject(index) {
      this.projects.splice(index, 1);
    },
    addProject() {
      this.projects.push(new Project());
    },
    missingInfo(obj) {
      return !Project.validate(obj);
    },
    emitData() {
      this.$emit('update-component-data', {
        componentType: 'projects',
        content: this.projects
      });
    }
  }
}
</script>