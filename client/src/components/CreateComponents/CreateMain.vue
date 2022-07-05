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

    <div v-if="!editComponentView">

      <button @click="addComponent()">Add</button>
      <div class="draggable-container">

        <draggable v-model="portfolioComponents" class="center">
          <TransitionGroup name="list" tag="ul" class="draggable-list">
            <li v-for="item in portfolioComponents" :key="item.id" :style="`background-color: ${item.color}`" class="draggable-item" @click="toggleEditView(item.name)">
              {{ item.name }}
            </li>
          </TransitionGroup>
        </draggable>

      </div>

    </div>
    
    <div v-else>

      <education v-if="componentName === 'Education'" :userData="userData" />
      <projects v-else-if="componentName === 'Projects'" :userData="userData" />
      <accomplishments v-else-if="componentName === 'Accomplishments'" :userData="userData" />
      <experiences v-else-if="componentName === 'Experiences'" :userData="userData" />

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
  data: () => {
    return {
      portfolioComponents: [{id: 0, name: 'Projects', color: 'red'}, {id: 1, name: 'Education', color: 'yellow'}, {id: 2, name: 'Accomplishments', color: 'lightblue'}, {id: 3, name: 'Experiences', color: 'green'}],
      editComponentView: false,
      componentName: undefined,
    }
  },
  methods: {
    addComponent() {
      this.portfolioComponents.push({id: 5, name: 'Test', color: 'orange'})
    },
    toggleEditView(componentName) {
      this.componentName = componentName;
      this.editComponentView = true;
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

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.draggable-list {
  list-style: none;
  cursor: pointer;
}

.draggable-container {
  text-align: center;
  border: 1px solid black;  
  margin: 1%;
}

.draggable-item {
  
}
</style>