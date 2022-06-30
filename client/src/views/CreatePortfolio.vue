<template>
  <div class="center">
    <p>Create Route</p>
    <p>Draggable Selections</p>

    <div>
      <draggable v-model="portfolioComponents">
        <TransitionGroup name="list" tag="ul">
          <li v-for="item in portfolioComponents" :key="item.id">
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
        portfolioComponents: [{id: 0, name: 'Projects'}, {id: 1, name: 'Education'}, {id: 2, name: 'Achievements'}, {id: 3, name: 'Projects'}]
      }
    },
    methods: {
    
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
  /* @import url('../UniversalStyles.css'); */
  .list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
</style>