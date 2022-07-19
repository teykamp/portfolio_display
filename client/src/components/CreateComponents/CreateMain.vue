<template>
  <div>

    <div v-if="!editComponentView" class="mt-5">
      <Steps />
    </div>

    <div v-if="!editComponentView">
        <v-container class="mt-6" fluid fill-height>
          <v-row align="center" justify="center">
            <TransitionGroup name="list"> 
              <v-card 
              v-for="(item, index) in portfolioComponents" 
              :key="item.id" :color="`${item.color} lighten-1`"             
              @click.stop="addComponent(index)"
              >               
                <v-row class="justify-space-between" 
                no-gutters 
                align="center"
                justify="center">
                  <v-col >
                    <v-card-title>{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
                  </v-col>
                  <v-col cols="2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-help-circle
                        </v-icon>
                      </template>
                      <span>{{ item.desc }}</span>
                    </v-tooltip>                
                  </v-col>
                </v-row>
                
              </v-card>
            </TransitionGroup>
          </v-row>

          <v-row align="center" justify="center" class="mt-10">
            <draggable v-model="addedPortfolioComponents">
              <TransitionGroup name="list"> 
                <v-card 
                v-for="(item, index) in addedPortfolioComponents" 
                :key="item.id" :color="`${item.color} lighten-1`"                 
                >
                  
                  <v-row 
                  no-gutters
                  align="center"
                  justify="center">
                    <v-col :retain-focus="false" cols="1" class="ml-3" @click="deleteConfirmationDialog = true; targetedComponentIndex = index">
                      <v-row justify="center">                      
                        <v-icon>                                                                         
                          mdi-close-circle
                        </v-icon>
                      </v-row>         
                    </v-col>
                    <v-col >
                      <v-card-title >{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
                    </v-col>
                    <v-col cols="2" @click="componentName = item.name; editComponentView = true">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-pencil
                          </v-icon>
                        </template>
                        <span>Edit {{ item.name }}</span>
                      </v-tooltip>                
                    </v-col>
                  </v-row>
                  
                </v-card>
              </TransitionGroup>
            </draggable>
          </v-row> 
        </v-container>
        

      <!-- <button @click="$parent.userData.visibility = !$parent.userData.visibility">Toggle Account Visibility</button>
      <div :style="`background-color: ${this.userData.visibility ? 'lime' : 'red' }`">
        <p>{{ this.userData.visibility ? 'Public' : 'Private' }}</p>
      </div> -->

    </div>
    
    <div v-else>

      <education v-if="componentName === 'education'" :userData="userData" />
      <projects v-else-if="componentName === 'projects'" :userData="userData" />
      <accomplishments v-else-if="componentName === 'accomplishments'" :userData="userData" />
      <experiences v-else-if="componentName === 'experiences'" :userData="userData" />

      <h1 v-else>Unrecognized Component Type '{{ componentName }}'</h1>

    </div>

    <DeleteDialog 
    :description="`Removing the ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` } 
    component from your portfolio will delete all the data contained inside and cannot be undone!`" 
    :title="`Delete 
    ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` }?`" 
    :visible="deleteConfirmationDialog" 
    @close="deleteConfirmationDialog = false"
    @confirmed="deleteConfirmationDialog = false; removeComponent(targetedComponentIndex)" />

    <!-- <b-button variant="success" @click="$parent.editMode ? updatePortfolioRemote() : createPortfolioRemote() ">
    {{ $parent.editMode ? 'Save Changes' : 'Create Portfolio' }}</b-button> -->
    <!-- <pre>
      {{userData}}
    </pre> -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Projects from '../CreateComponents/CreateSubComponents/CreateProjects.vue'
import Accomplishments from '../CreateComponents/CreateSubComponents/CreateAccomplishments.vue'
import Experiences from '../CreateComponents/CreateSubComponents/CreateExperiences.vue'
import Education from '../CreateComponents/CreateSubComponents/CreateEducation.vue'
import Steps from './CreateSubComponents/StepByStep.vue'
import DeleteDialog from '../ReusableComponents/DialogBox.vue'

export default {
  components: {
    Projects,
    Accomplishments,
    Experiences,
    Education,
    draggable,
    Steps,
    DeleteDialog
  },
  props: [
    'userData'
  ],
  mounted() {
    setTimeout(() => this.initalizeComponentArraysOnLoad(), 5);
  },
  data: () => {
    return {
      portfolioComponents: [],
      addedPortfolioComponents: [],
      editComponentView: false,
      componentName: undefined,

      targetedComponentIndex: 0,
      deleteConfirmationDialog: false

    }
  },
  methods: {
    initalizeComponentArraysOnLoad() {

      /* injects components */
      this.portfolioComponents = [{id: 0, name: 'projects', color: 'red', desc: 'Flawlessly display software projects you have completed!'}, 
      {id: 1, name: 'education', color: 'yellow', desc: 'Include your academic achievements and degrees earned!'}, 
      {id: 2, name: 'accomplishments', color: 'blue', desc: 'The perfect way to show your most valuable competitive accolades!'}, 
      {id: 3, name: 'experiences', color: 'green', desc: 'Highlight professional internship or work experiences.'}]

      /* loops through all components and makes sure that the components that already 
      have been edited by user are shown on the 'added' components tab */
      const addedComponents = [];
      for (let i = 0; i < this.portfolioComponents.length; i++) {
        
        if (this.userData[this.portfolioComponents[i].name]) {
          this.addedPortfolioComponents.push(this.portfolioComponents[i]);
          addedComponents.push(this.portfolioComponents[i]);
        }
      }

      /* remove component from portfolioComponents so that a duplicate doesn't exist */
      addedComponents.forEach(component => {
        if (this.portfolioComponents.includes(component)) {
          this.portfolioComponents.splice(this.portfolioComponents.indexOf(component), 1);
        }
      })

      /* adds the pageRank back to the added components based on the order previously determined by user */
      for (let i = 0; i < this.addedPortfolioComponents.length; i++) {
        this.addedPortfolioComponents[i].pageRank = this.userData[this.addedPortfolioComponents[i].name].pageRank;
      }

      this.addedPortfolioComponents.sort((a, b) => a.pageRank - b.pageRank);
    },
    toggleEditView(componentName) {
      this.componentName = componentName;
      this.editComponentView = true;
    },
    updatePortfolioRemote() {
      if (this.$route.params?.user) {
        alert(`${this.$route.params.user}s portfolio has been updated in the database`)
      } else {
        alert("I'm not sure what users' info needs to be updated...")
      }
      this.$router.push('/');
    },
    createPortfolioRemote() {
      alert('Portfolio Has Been Created!');
      this.$router.push('/');
    },
    addComponent(index) {
      this.addedPortfolioComponents.push(this.portfolioComponents[index]);
      this.portfolioComponents.splice(index, 1);
    },
    removeComponent(index) {
      this.portfolioComponents.push(this.addedPortfolioComponents[index]);
      this.addedPortfolioComponents.splice(index, 1);
    }
  },
  watch: {
    addedPortfolioComponents() {
      // Update Page Rankings
      for (let i = 0; i < this.addedPortfolioComponents.length; i++) {
        const content = this.$parent.userData[this.addedPortfolioComponents[i].name]?.content ?? [];
        this.$parent.userData[this.addedPortfolioComponents[i].name] = { pageRank: i, content: content };
      }

      for (let i = 0; i < this.portfolioComponents.length; i++) {
        if (this.$parent.userData[this.portfolioComponents[i].name]) {
          delete this.$parent.userData[this.portfolioComponents[i].name];
        }
      }
    }
  }
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

v-col {
  border: 10px solid black
}
</style>