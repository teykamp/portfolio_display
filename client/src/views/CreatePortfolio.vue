<template>
  <div class="center">
    <p>Create Route</p>
    <p>Draggable Selections</p>

    <div>
      <draggable>
        <transition-group name="list" tag="ul">
          <div v-for="components in portfolioComponents" :key="components.id">
            {{ components }}
          </div>
        </transition-group>
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
        portfolioComponents: ['Projects', 'Education', 'Achievements']
      }
    },
    components: {
      draggable
    }
  })
</script>

<style scoped>
  @import url('../UniversalStyles.css');
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>