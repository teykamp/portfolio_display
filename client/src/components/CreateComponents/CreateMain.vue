<template>
  <div>

    <transition :name="`slide-${transitionDirection}`">
      <div v-if="!editComponentView">

        <MainToolbar
          :invalidComponents="invalidComponents"
          :loading="loading"
          :userData="userData"
          :userDataOnStart="userDataOnStart"
          @refresh-userdata-onstart="userDataOnStart = JSON.stringify(userData);"
          @select-components="toggleEditView('SelectComponents')"
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
          <v-row align="center" justify="center">

            <v-col 
              cols="12" 
              sm="10" 
              md="8"
            >
              <!-- HEADER CARD -->
              <ComponentCard 
                :draggable="false" 
                :removable="false"
                :invalid="invalidComponents.includes('header')"
                @edit="toggleEditView('Header')"
                item="header"
              />
              
              <!-- BODY CARDS -->
              <draggable 
                v-model="activeComponents" 
                :group="{ pull: false }"
                :disabled="!canComponentsDrag"
                @end="dragEnded"
              >
                <TransitionGroup name="list"> 
                  <div 
                    v-for="(item, index) in activeComponents" 
                    :key="item"
                  >
                    <ComponentCard
                      :item="item"
                      :invalid="invalidComponents.includes(item)"
                      @edit="toggleEditView(item)"
                      @remove="requestComponentRemoval(index)" 
                      @update-drag="canComponentsDrag = $event"
                    />
                  </div>
                </TransitionGroup>
              </draggable>

              <KickStartSuggestions 
                v-if="activeComponents.length === 0 && !loading"
                :addAction="() => toggleEditView('SelectComponents')" 
              />

              <div 
                v-if="showDragSwitch"
                class="center"
                style="flex-direction: row;"
              >
                <span>{{ dragToggleMsg }}</span>
                <v-switch
                  class="ml-4"
                  v-model="canComponentsDrag"
                ></v-switch>
              </div>

            </v-col>
          </v-row> 
        </v-container>      

      </div>
  
      <component v-else
        :is="componentBeingEdited" 
        :userData="userData"
        :selectedComponents="activeComponents"
        @update-active-components="updateActiveComponents($event)"
        @update-component-data="updateComponentData($event)"
      />

    </transition>

    <DeleteDialog 
      :description="`Removing the ${activeComponents[targetedComponentIndex]} 
      component from your portfolio will delete all the data contained inside and cannot be undone!`" 
      :title="`Delete ${activeComponents[targetedComponentIndex]}?`" 
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
import SelectComponents from './SelectComponents.vue'
import KickStartSuggestions from './CreateSubComponents/NonPortfolioComponents/KickStartSuggestions.vue'

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
    MainToolbar,
    SelectComponents,
    KickStartSuggestions
  },
  async mounted() {

    const sessionUser = localStorage.getItem('username');

    // checks if user is logged in
    if (!sessionUser) {
      this.$router.push({ name: 'Auth', query: { type: 'login' } });
    }

    // asks the database for the logged in users portfolio content
    let data;
    try {
      data = await DatabaseServices.getPortfolioContentByUsername(sessionUser);
    } catch {
      this.$store.state.snackbarText = 'There was an issue connecting to our servers';
      this.$router.push('/');
    }

    // stores the portfolio obtained from the database to see if changes were made on exit
    this.userDataOnStart = JSON.stringify(data);

    // checks if unresolved session is saved in state, 
    // this could be because user exited previously or is returning from a preview
    if (this.$store.state.portfolioItem) {
      this.userData = this.$store.state.portfolioItem;
    } 

    // checks if user has a portfolio on file w/o errors
    else if (!data?.error) {
      this.userData = data;
    }

    // if no valid porfolio is on file, it starts user off with some boilerplate
    else {
      this.userData.header = new HeaderClass();
    } 

    this.validatePortfolioComponents();
    this.orderComponentsByPageRank();
    this.loading = false;
  },
  data() {
    return {
      // captures userData on mounted and compares it with the userData on exit
      userDataOnStart: '',
      // true if component is in a loading state and data has not finished fetching
      loading: true,
      // components that user has added
      activeComponents: [],
      // true when a component is being edited by user and main interface is hidden
      editComponentView: false,
      // name of the component that is being edited, empty when no component is being worked on
      componentBeingEdited: '',
      // an integer that stores the index of an item that the user wants to remove from activeComponents
      targetedComponentIndex: 0,
      // true when the dialog box is showing that asks for the user to confirm whether or they want a component deleted
      deleteConfirmationDialog: false,
      // array of all invalid component
      invalidComponents: [],
      // userData object is the portfolioItem that is being edited by the user
      userData: {},
      // if true, components are allowed to be dragged
      canComponentsDrag: true,
      // the direction the component transitions slide in
      transitionDirection: 'out'
    }
  },
  computed: {
    dragToggleMsg() {
      return `Dragging is ${this.canComponentsDrag ? '':'in'}active`;
    },
    showDragSwitch() {
      return !this.$vuetify.breakpoint.mdAndUp;
    }
  },
  methods: {
    dragEnded() {
      if (!this.showDragSwitch) this.canComponentsDrag = false;
    },
    requestComponentRemoval(index) {
      this.targetedComponentIndex = index; 
      this.deleteConfirmationDialog = true;
    },
    orderComponentsByPageRank() {
      const componentsWithPageRank = [];
      const userDataKeys = Object.keys(this.userData);
      for (let i in userDataKeys) {
        if (this.userData[userDataKeys[i]]?.pageRank !== undefined) {
          componentsWithPageRank.push({ 
            name: userDataKeys[i], 
            pageRank: parseInt(this.userData[userDataKeys[i]].pageRank)
          });
        }
      }

      this.activeComponents = componentsWithPageRank
        .sort((a, b) => a.pageRank - b.pageRank)
        .map(comp => comp.name)
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
    updateActiveComponents(updatedComponentsList) {
      // instanciates a new object with name of the component added & properties 'pageRank' & 'content' 
      for (let i in updatedComponentsList) {
        if (!this.userData[updatedComponentsList[i]]) {
          this.userData[updatedComponentsList[i]] = { 
            pageRank: -1, 
            content: []
          };
        }
      }
      
      this.orderComponentsByPageRank();
      this.validatePortfolioComponents();
    },
    removeComponent(index) {
      /* deletes all component data */
      delete this.userData[this.activeComponents[index]];

      /* patches edge case were a component is removed but persists in timeline */
      if (this.userData?.timeline) {
        if (this.userData.timeline.content.includes(this.activeComponents[index])) {
          this.userData.timeline.content.splice(this.userData.timeline.content.indexOf(this.activeComponents[index]), 1);
        }
      }

      this.$store.state.snackbarText = `${this.activeComponents[index]} has been removed`;
      this.activeComponents.splice(index, 1);
      this.validatePortfolioComponents();
    }
  },
  watch: {
    activeComponents() {
      // Update page rankings
      for (let i in this.activeComponents) {
        this.userData[this.activeComponents[i]].pageRank = i;
      }
    },
    editComponentView(v) {
      this.transitionDirection =  v ? 'out' : 'in';
    }
  }
}
</script>

<style scoped>
.list-move /* apply transition to moving elements */ {
  transition: all 0.5s ease;
}

.slide-in-enter, .slide-out-leave-to {
  transform: translateX(-100vw);
}
.slide-in-enter-to, .slide-in-leave-from, .slide-out-enter-to, .slide-out-leave-from {
  transform: translateX(0);
}
.slide-in-enter-active, .slide-in-leave-active, .slide-out-enter-active, .slide-out-leave-active {
  transition: all 300ms;
  position: fixed;
}
.slide-in-leave-to, .slide-out-enter {
  transform: translateX(100vw);
}
</style>