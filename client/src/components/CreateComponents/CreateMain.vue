<template>
  <div class="center">
    <div style="max-width: 50%;">
      <h3>We make building your porfolio easy. Follow these few steps to get up and running!</h3>
      <p>1. Drag the portfolio items you want to include in your portfolio into 'my porfolio'.</p>
      <p>2. Click on the different components you added to your portfolio to fill in and edit the content displayed in those components.</p>
      <p>3. Rearrange your porfolios visual hierachy by simply dragging each component into the order you best see fit.</p>
      <br>
      <p>When you have added all the components, and filled in all the information, we encourage you to take a peak at how it will look when it is done. Hit the preview button on the top right corner!</p>
    </div>

    <div class="center" style="flex-direction: row;" v-if="!editComponentView">

      <div class="draggable-container">
        <p>Component List:</p>
        <draggable v-model="portfolioComponents" v-bind="dragOptions" :move="onMove" class="center">
          <TransitionGroup name="list" tag="ul" class="draggable-list">
            <li v-for="item in portfolioComponents" :key="item.id" :style="`background-color: ${item.color}`" class="draggable-item">
              {{ item.name }}
            </li>
          </TransitionGroup>
        </draggable>
      </div>

      <div class="draggable-container">
        <p>Added Components:</p>
        <draggable v-model="addedPortfolioComponents" v-bind="dragOptions" :move="onMove" class="center">
          <TransitionGroup name="list" tag="ul" class="draggable-list">
            <li v-for="item in addedPortfolioComponents" :key="item.id" :style="`background-color: ${item.color}`" class="draggable-item" @click="toggleEditView(item.name)">
              {{ item.name }}
            </li>
          </TransitionGroup>
        </draggable>
      </div>

    </div>

    
    
    <div v-else>

      <education v-if="componentName === 'education'" :userData="userData" />
      <projects v-else-if="componentName === 'projects'" :userData="userData" />
      <accomplishments v-else-if="componentName === 'accomplishments'" :userData="userData" />
      <experiences v-else-if="componentName === 'experiences'" :userData="userData" />

      <h1 v-else>Unrecognized Component Type '{{ componentName }}'</h1>

    </div>

    <b-button>Create</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import Projects from '../CreateComponents/CreateSubComponents/CreateProjects.vue'
import Accomplishments from '../CreateComponents/CreateSubComponents/CreateAccomplishments.vue'
import Experiences from '../CreateComponents/CreateSubComponents/CreateExperiences.vue'
import Education from '../CreateComponents/CreateSubComponents/CreateEducation.vue'

export default Vue.extend({
  components: {
    Projects,
    Accomplishments,
    Experiences,
    Education,
    draggable
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
      portfolioComponents: [{id: 0, name: 'projects', color: 'red'}, {id: 1, name: 'education', color: 'yellow'}, {id: 2, name: 'accomplishments', color: 'lightblue'}, {id: 3, name: 'experiences', color: 'green'}],
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
})
</script>

<style scoped>
@import url('../../UniversalStyles.css');
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.draggable-list {
  list-style: none;
  cursor: move;
}

.draggable-container {
  text-align: center;
  border: 1px solid black;  
  margin: 1%;
}

.draggable-item {
  
}
</style>