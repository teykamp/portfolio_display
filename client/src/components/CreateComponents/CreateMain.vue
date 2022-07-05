<template>
  <div class="center">
    <p>Create Route</p>
    <p>Now, Choose Which Items You Wanted Added </p>

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

      <education v-if="componentName === 'Education'" />
      <projects v-else-if="componentName === 'Projects'" />
      <accomplishments v-else-if="componentName === 'Accomplishments'" />
      <experiences v-else-if="componentName === 'Experiences'" />
      <h1 v-else>Unrecognized Component Type '{{ componentName}}'</h1>

      <b-button @click="editComponentView = false">Back</b-button>

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
  data: () => {
    return {
      portfolioComponents: [{id: 0, name: 'Projects', color: 'red'}, {id: 1, name: 'Education', color: 'yellow'}, {id: 2, name: 'Accomplishments', color: 'blue'}, {id: 3, name: 'Experiences', color: 'green'}],
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
  },
  watch: {
    portfolioComponents() {
      console.log(this.portfolioComponents[0].name)
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