<template>
  <div>

    <div v-if="$parent.editMode">
      <h1>Edit Your Portfolio</h1>
    </div>
     
    <div v-else-if="!$parent.editMode && !editComponentView">
      <Steps />
    </div>

    <div v-if="!editComponentView">

      
    <v-row>
      <v-col>
        <draggable v-model="portfolioComponents" v-bind="dragOptions" :move="onMove">
          <TransitionGroup name="list"> 
            <v-card 
            v-for="item in portfolioComponents" 
            :key="item.id" :color="`${item.color} lighten-1`"  
            max-width="275"
            >
              
              <v-row class="justify-space-between" 
              no-gutters 
              align="center"
              justify="center">
                <v-col >
                  <v-card-title>{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
                </v-col>
                <v-col fill-height cols="2">
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
        </draggable>
      </v-col>
    </v-row>
     

      <div>
        <draggable v-model="addedPortfolioComponents" v-bind="dragOptions" :move="onMove" class="center">
          <TransitionGroup name="list" tag="ul" class="draggable-list">
            <v-card 
            v-for="item in addedPortfolioComponents" 
            :key="item.id" :color="`${item.color} lighten-1`" 
            outlined
            elevation="3"
            maxWidth="200px">
              <v-card-title>{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
              <v-card-text>{{ item.desc }}</v-card-text>
            </v-card>
          </TransitionGroup>
        </draggable>
      </div>

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

    <b-button variant="success" @click="$parent.editMode ? updatePortfolioRemote() : createPortfolioRemote() ">
    {{ $parent.editMode ? 'Save Changes' : 'Create Portfolio' }}</b-button>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Projects from '../CreateComponents/CreateSubComponents/CreateProjects.vue'
import Accomplishments from '../CreateComponents/CreateSubComponents/CreateAccomplishments.vue'
import Experiences from '../CreateComponents/CreateSubComponents/CreateExperiences.vue'
import Education from '../CreateComponents/CreateSubComponents/CreateEducation.vue'
import Steps from './CreateSubComponents/StepByStep.vue'

export default {
  components: {
    Projects,
    Accomplishments,
    Experiences,
    Education,
    draggable,
    Steps
  },
  props: [
    'userData'
  ],
  created() {

    /* loops through all components and makes sure that the components that already 
    have been edited by user are shown on the 'added' components tab */
    const addedComponents = [];
    for (let i = 0; i < this.portfolioComponents.length; i++) {
      if (this.userData[this.portfolioComponents[i].name]) {
        this.addedPortfolioComponents.push(this.portfolioComponents[i]);
        addedComponents.push(this.portfolioComponents[i]);
      }
    }

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
  data: () => {
    return {
      portfolioComponents: [{id: 0, name: 'projects', color: 'red', desc: 'Flawlessly display software projects you have completed!'}, 
      {id: 1, name: 'education', color: 'yellow', desc: 'Include your academic achievements and degrees earned!'}, 
      {id: 2, name: 'accomplishments', color: 'blue', desc: 'The perfect way to show your most valuable competitive accolades!'}, 
      {id: 3, name: 'experiences', color: 'green', desc: 'Highlight professional internship or work experiences.'}],
      addedPortfolioComponents: [],
      editComponentView: false,
      componentName: undefined,
    }
  },
  methods: {
    toggleEditView(componentName) {
      this.componentName = componentName;
      this.editComponentView = true;
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
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
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      };
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
</style>