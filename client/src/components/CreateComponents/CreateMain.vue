<template>
  <div>

    <div v-if="!editComponentView">

      <MainToolbar
        :invalidComponents="invalidComponents"
        :loading="loading"
        :userData="userData"
        :userDataOnStart="userDataOnStart"
      /> 

      <div v-if="loading">
        <div v-for="i in 6" :key="i">
          <v-skeleton-loader
            class="mx-auto my-3"
            height="75"
            max-width="80vw"
            type="image"
          ></v-skeleton-loader>
        </div>
      </div>

      <v-container 
        v-else
        fluid 
        fill-height
      >  
        <v-row 
          align="center" 
          justify="center"
        >
          <v-col 
            cols="12" 
            sm="10" 
            md="8"
          >
          <draggable v-model="portfolioComponents" :group="'cards'">
            <TransitionGroup name="list"> 
              <div 
                v-for="item in portfolioComponents" 
                :key="item.id"
              >
                <ComponentCard 
                  :item="item"
                  :removable="false"
                  :draggable="false"
                  :editable="false"
                />
              </div>
            </TransitionGroup>
          </draggable>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">

          <v-col cols="12" sm="10" md="8">

            <!-- HEADER CARD -->
            <ComponentCard 
              :draggable="false" 
              :removable="false"
              :invalid="invalidComponents.includes('header')"
              :onClick="() => toggleEditView('Header')"
              :item="{ name: 'header', color: 'pink' }"
            />
            
            <!-- BODY CARDS -->
            <draggable 
              v-model="addedPortfolioComponents" 
              :group="{ name: 'cards', pull: false }"
              :empty-insert-threshold="300"
            >
              <TransitionGroup name="list"> 
                <div 
                  v-for="(item, index) in addedPortfolioComponents" 
                  :key="item.id"
                >
                  <ComponentCard 
                    :item="item" 
                    :onClick="() => { toggleEditView(item.name) }"
                    :invalid="invalidComponents.includes(item.name)"
                    @remove="targetedComponentIndex = index; deleteConfirmationDialog = true;" 
                  />
                </div>
              </TransitionGroup>
            </draggable>

            <!-- FOOTER CARD -->
            <!-- <ComponentCard 
              :draggable="false" 
              :removable="false"
              :item="{ name: 'footer', color: 'teal', desc: 'Footer currently uneditable' }" 
              :editable="false"
            /> -->

          </v-col>
        </v-row> 
      </v-container>      

    </div>
    
    <component 
      v-else 
      :is="componentBeingEdited" 
      :userData="userData" 
      @update-component-data="updateComponentData($event)"
    />

    <DeleteDialog 
      :description="`Removing the ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` } 
      component from your portfolio will delete all the data contained inside and cannot be undone!`" 
      :title="`Delete ${addedPortfolioComponents[targetedComponentIndex] ? `${addedPortfolioComponents[targetedComponentIndex].name}` : `` }?`" 
      :visible="deleteConfirmationDialog" 
      @close="deleteConfirmationDialog = false;"
      @confirmed="deleteConfirmationDialog = false; removeComponent(targetedComponentIndex);" 
    />

  </div>
</template>

<script>
// UI Components
import Projects from '../CreateComponents/CreateSubComponents/CreateProjects.vue'
import Accomplishments from '../CreateComponents/CreateSubComponents/CreateAccomplishments.vue'
import Experiences from '../CreateComponents/CreateSubComponents/CreateExperiences.vue'
import Education from '../CreateComponents/CreateSubComponents/CreateEducation.vue'
import DeleteDialog from '../ReusableComponents/DialogBox.vue'
import Header from '../CreateComponents/CreateSubComponents/CreateHeader.vue'
import Timeline from '../CreateComponents/CreateSubComponents/CreateTimeline.vue'
import ComponentCard from './CreateSubComponents/NonPortfolioComponents/ComponentCard.vue'
import MainToolbar from './CreateSubComponents/NonPortfolioComponents/MainToolbar.vue'

// Logic
import draggable from 'vuedraggable'
import DatabaseServices from '../../DatabaseServices'
import validatePortfolio from '../../utils/ValidatePortfolio'
import HeaderClass from '../../utils/PortfolioSchemas/Header'

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
    ComponentCard,
    MainToolbar
  },
  async mounted() {

    // checks if user is logged in
    if (!localStorage.getItem('username')) {
      this.$router.push({ name: 'Auth', query: { type: 'login' } });
    }

    // checks if unresolved session is saved in state, 
    // this could be because user exited previously or is returning from a preview
    else if (this.$store.state.portfolioItem) {
      this.userData = this.$store.state.portfolioItem;
    } 

    else {

      // send get to see if user already has portfolio
      const sessionUser = localStorage.getItem('username');
      let data;
      try {
        data = await DatabaseServices.getPortfolioByUsername(sessionUser);
      } catch {
        this.$store.state.snackbarText = 'There was an issue connecting to our servers';
        this.$router.push('/');
      }

      // if yes
      if (data) {
        this.userData = data;
      // if no
      } else {
        this.userData.header = new HeaderClass();
      }
    }
    
    this.userDataOnStart = JSON.stringify(this.userData);
    this.validatePortfolioComponents();
    this.initalizeComponentArraysOnLoad();
    this.loading = false;
  },
  data() {
    return {
      // captures userData on mounted and compares it with the userData on exit
      userDataOnStart: '',

      // true if component is in a loading state and data has not finished fetching
      loading: true,

      // unadded portfolio components
      portfolioComponents: [],

      // components added by user
      addedPortfolioComponents: [],

      // true when a component is being edited by user and main interface is hidden
      editComponentView: false,

      // name of the component that is being edited, empty when no component is being worked on
      componentBeingEdited: '',

      // an integer that stores the index of an item that the user wants to remove from addedComponents
      targetedComponentIndex: 0,

      // true when the dialog box is showing that asks for the user to confirm whether or they want a component deleted
      deleteConfirmationDialog: false,

      // array of all invalid component
      invalidComponents: [],

      // userData object is the portfolioItem that is being edited by the user
      userData: { visibility: true }
    }
  },
  methods: {
    initalizeComponentArraysOnLoad() {

      /* all components that we offer to users */
      this.portfolioComponents = [
        {id: 0, name: 'projects', color: 'blue lighten-4', desc: 'Flawlessly display software projects you have completed!'}, 
        {id: 1, name: 'education', color: 'blue lighten-4', desc: 'Include your academic achievements and degrees earned!'}, 
        {id: 2, name: 'accomplishments', color: 'blue lighten-4', desc: 'The perfect way to show your most valuable competitive accolades!'}, 
        {id: 3, name: 'experiences', color: 'blue lighten-4', desc: 'Highlight professional internship or work experiences.'},
        {id: 4, name: 'timeline', color: 'blue lighten-4', desc: 'Display a timeline that chronicals your personal development.'}
      ];

      /* loops through all components backwards and makes sure that the components 
      that already have been edited by user are shown on the 'added' components tab */
      for (let i = this.portfolioComponents.length - 1; i >= 0; i--) {
        if (this.userData[this.portfolioComponents[i].name]) {
          this.addedPortfolioComponents.push(this.portfolioComponents[i]);
          this.portfolioComponents.splice(i, 1);
        }
      }

      /* adds the pageRank back to the added components based on the order previously determined by user */
      for (let i = 0; i < this.addedPortfolioComponents.length; i++) {
        this.addedPortfolioComponents[i].pageRank = this.userData[this.addedPortfolioComponents[i].name].pageRank;
      }

      this.addedPortfolioComponents.sort((a, b) => a.pageRank - b.pageRank);
    },
    updateComponentData({ componentType, content }) {
      this.userData[componentType].content = content;
      this.validatePortfolioComponents();
      this.saveSessionLocally();
    },
    validatePortfolioComponents() {
      // validatePortolio takes a complete portfolio object 
      // and returns an array containing string names of all invalid components
      this.invalidComponents = validatePortfolio(this.userData);
    },
    saveSessionLocally() {
      // adds unsaved changes to localStorage for backup in case session is closed unexpectedly
      try {
        localStorage.setItem('unsavedSessionData', JSON.stringify(this.userData));
      } catch {
        throw new Error('An issue was encountered when trying to backup session data locally.');
      }

      this.$store.state.portfolioItem = this.userData;
    },
    toggleEditView(componentName) {
      this.componentBeingEdited = componentName;
      this.editComponentView = !this.editComponentView;
    },
    addComponent(index) {
      // instanciates a new object with name of the component added & properties 'pageRank' & 'content' 
      this.userData[this.addedPortfolioComponents[index].name] = { pageRank: 0, content: [] }
      this.validatePortfolioComponents();

      // this.addedPortfolioComponents.push(this.portfolioComponents[index]);
      // this.portfolioComponents.splice(index, 1);
    },
    removeComponent(index) {
      /* deletes all component data */
      delete this.userData[this.addedPortfolioComponents[index].name];

      /* patches edge case were a component is removed but persists in timeline */
      if (this.userData?.timeline) {
        if (this.userData.timeline.content.includes(this.addedPortfolioComponents[index].name)) {
          this.userData.timeline.content.splice(this.userData.timeline.content.indexOf(this.addedPortfolioComponents[index].name), 1);
        }
      }

      this.portfolioComponents.push(this.addedPortfolioComponents[index]);
      this.addedPortfolioComponents.splice(index, 1); 

      this.validatePortfolioComponents();
    }
  },
  watch: {
    addedPortfolioComponents() {
      // Update Page Rankings
      for (let i = 0; i < this.addedPortfolioComponents.length; i++) {
        // calls addComponent if component is new to the list
        if (this.userData[this.addedPortfolioComponents[i].name]?.pageRank === undefined) {
          this.addComponent(i);
        }
        this.userData[this.addedPortfolioComponents[i].name].pageRank = i;
      }
    }
  }
}
</script>

<style scoped>
.list-move /* apply transition to moving elements */ {
  transition: all 0.5s ease;
}
</style>