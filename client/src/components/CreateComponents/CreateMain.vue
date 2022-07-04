<template>
  <div class="center">
    <p>Create Route</p>
    <p>Now, Choose Which Items You Wanted Added </p>
    <button @click="addComponent()">Add</button>
    <div class="draggable-container">
      <draggable v-model="portfolioComponents" class="center">
        <TransitionGroup name="list" tag="ul" class="draggable-list">
          <li v-for="item in portfolioComponents" :key="item.id" :style="`background-color: ${item.color}`" class="draggable-item">
          {{ item.name }}
          </li>
        </TransitionGroup>
      </draggable>
    </div>
    

    <b-button>Create</b-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import draggable from 'vuedraggable'

  export default Vue.extend({
    data: () => {
      return {
        portfolioComponents: [{id: 0, name: 'Projects', color: 'red'}, {id: 1, name: 'Education', color: 'yellow'}, {id: 2, name: 'Achievements', color: 'blue'}, {id: 3, name: 'Expiriences', color: 'green'}]
      }
    },
    methods: {
      addComponent() {
        this.portfolioComponents.push({id: 5, name: 'Test', color: 'orange'})
      }
    },
    watch: {
      portfolioComponents() {
        console.log(this.portfolioComponents[0].name)
      }
    },
    components: {
      draggable
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