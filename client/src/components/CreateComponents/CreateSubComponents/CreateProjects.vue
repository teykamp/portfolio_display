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

      <div 
        v-show="projects.length === 0" 
        style="display: flex; align-items: center; justify-content: center;"
      >
        <v-icon large class="mr-2">mdi-file-code-outline</v-icon>
        <span style="font-size: 16pt">Added Projects Go Here</span>
      </div>
      
      <v-container fill-height fluid>
        <v-row>
          <v-col 
            class="col-sm-12 col-md-6"
            v-for="(project, index) in projects" :key="project.id"
          >
            <CardWrapper
              :placeholder="'Project Name'"
              :missingInfo="missingInfo(project)"
              :title="project.name"
              @update-title="project.name = $event"
              @remove="removeProject(index)"
            >
              <template>
                <v-btn 
                  class="mb-2" 
                  block 
                  color="primary" 
                  dark 
                  @click="techView = true; projectSelected = project"
                >
                  <span>Add Technologies Used ({{ project.technologies.length }})</span>
                </v-btn>
                <p 
                  v-show="project.technologies.length === 0" 
                  style="color: red"
                >*At Least 1 Technology Required</p>

                <v-text-field 
                  label="Deployment URL"
                  v-model="projects[index].linkToDeploy"
                ></v-text-field>
                <v-text-field 
                  color="orange"
                  label="Repository URL"
                  v-model="projects[index].linkToRepo"
                ></v-text-field>
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
              </template>
            </CardWrapper>
          </v-col>              
        </v-row>
      </v-container>
    </div>

    <div v-else>
      <Toolbar 
        :title="'Technology'"
        :exitAction="() => leaveTechView()"
        :onAdd="() => projectSelected.technologies.push({ name: '', logo: '' })"
        :addBtnColor="'red'"
        :listLength="projectSelected.technologies.length"
        :disabledAt="99"
      />

      <v-container fluid fill-height>
        <v-row 
          align="center" 
          justify="center"
        >
          <div v-show="projectSelected.technologies.length === 0">
            <span style="font-size: 16pt">Added Technologies {{ projectName }} Will Go Here!</span>
          </div>

          <v-col 
            v-for="(tech, index) in projectSelected.technologies" :key="tech.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card>
              <div class="pa-3 center">
                <v-autocomplete
                  v-model="tech.name"
                  label="Technology Name"
                  :items="techList"
                  :rules="[required]" 
                  autocomplete="do-not-autofill"        
                ></v-autocomplete>
                <img
                  v-if="tech.name" 
                  :src="require(`../../../assets/techLogos/${getImg(index)}`)" 
                  style="width: 30%" 
                  :alt="tech.name"
                />
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
import CreateMixin from './CreateMixin'
import Project from '../../../utils/PortfolioSchemas/Projects'
import techKeys from '../../../assets/techKeys'

export default {
  mixins: [
    CreateMixin
  ],
  created() {
    this.techList = Object.keys(techKeys);
    if (this.userData?.projects?.content) this.projects = this.userData.projects.content;
  },
  data: () => {
    return {
      projects: [],
      techView: false,
      projectSelected: {},
      techList: [],
    }
  },
  computed: {
    projectName() {
      return !this.projectSelected.name ? '' : ` For ${this.projectSelected.name}`;
    }
  },
  methods: {
    leaveTechView() {
      for (let i in this.projectSelected.technologies) {
        if (!this.projectSelected.technologies[i].name) {
          return this.$store.state.snackbarText = 'Assign all tech before leaving';
        }
      }

      this.techView = false;
    },
    getImg(index) {
      return techKeys[this.projectSelected.technologies[index].name];
    },
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