<template>
  <div>
    <div v-if="!editComponentView">
   
      <v-container fluid fill-height>
        
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


      
        <v-row align="center" justify="center">

          <v-col cols="8">

            <!-- HEADER -->
            <ComponentCard 
            :draggable="false" 
            :removable="false"
            :item="{name: 'header', color: 'pink'}" 
            @edit="componentName = 'Header'; editComponentView = true;"
            />
            
            <!-- BODY CARDS -->
            <draggable v-model="addedPortfolioComponents">
              <TransitionGroup name="list"> 
                <div 
                v-for="(item, index) in addedPortfolioComponents" 
                :key="item.id"
                >
                  <ComponentCard 
                  :item="item" 
                  @edit="componentName = item.name; editComponentView = true;" 
                  @remove="targetedComponentIndex = index; deleteConfirmationDialog = true;" 
                  />
                </div>
              </TransitionGroup>
            </draggable>

            <!-- FOOTER CARD -->
            <ComponentCard 
            :draggable="false" 
            :removable="false" 
            :item="{name: 'footer', color: 'teal'}" 
            @edit="componentName = 'footer'; editComponentView = true;"
            />

          </v-col>
        </v-row> 
      </v-container>      

    </div>
    
    <component v-else :is="componentName" :userData="userData" />

    <DeleteDialog 
    :description="`Removing the ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` } 
    component from your portfolio will delete all the data contained inside and cannot be undone!`" 
    :title="`Delete ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` }?`" 
    :visible="deleteConfirmationDialog" 
    @close="deleteConfirmationDialog = false;"
    @confirmed="deleteConfirmationDialog = false; removeComponent(targetedComponentIndex);" />

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Projects from '../CreateComponents/CreateSubComponents/CreateProjects.vue'
import Accomplishments from '../CreateComponents/CreateSubComponents/CreateAccomplishments.vue'
import Experiences from '../CreateComponents/CreateSubComponents/CreateExperiences.vue'
import Education from '../CreateComponents/CreateSubComponents/CreateEducation.vue'
import DeleteDialog from '../ReusableComponents/DialogBox.vue'
import Header from '../CreateComponents/CreateSubComponents/CreateHeader.vue'
import Timeline from '../CreateComponents/CreateSubComponents/CreateTimeline.vue'
import ComponentCard from '../CreateComponents/CreateSubComponents/ComponentCard.vue'

export default {
  components: {
    Projects,
    Accomplishments,
    Experiences,
    Education,
    draggable,
    Header,
    DeleteDialog,
    Timeline,
    ComponentCard
  },
  props: [
    'userData'
  ],
  mounted() {
    setTimeout(() => this.initalizeComponentArraysOnLoad(), 25);
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
      this.portfolioComponents = [
        {id: 0, name: 'projects', color: 'red', desc: 'Flawlessly display software projects you have completed!'}, 
        {id: 1, name: 'education', color: 'yellow', desc: 'Include your academic achievements and degrees earned!'}, 
        {id: 2, name: 'accomplishments', color: 'blue', desc: 'The perfect way to show your most valuable competitive accolades!'}, 
        {id: 3, name: 'experiences', color: 'green', desc: 'Highlight professional internship or work experiences.'},
        {id: 4, name: 'timeline', color: 'purple', desc: 'Display a timeline that chronicals your personal development.'}
      ];

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

          /* deletes all component data */
          delete this.$parent.userData[this.portfolioComponents[i].name];

          /* patches edge case were a component is removed but persists in timeline */
          if (this.$parent.userData?.timeline) {
            if (this.$parent.userData.timeline.content.includes(this.portfolioComponents[i].name)) {
              this.$parent.userData.timeline.content.splice(this.$parent.userData.timeline.content.indexOf(this.portfolioComponents[i].name), 1)
            }
          }
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