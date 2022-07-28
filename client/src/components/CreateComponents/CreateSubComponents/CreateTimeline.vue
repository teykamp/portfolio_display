<template>
  <div>

    <Toolbar 
    :title="'Timeline'"
    :exitAction="() => $parent.editComponentView = false"
    :disableAddBtn="true"
    />
    
    <div class="center" style="text-align: center">
      
      <div class="mx-3">
        <div class="text-h4">Select which components to add to timeline</div>
        <p>Only items with dates specified will appear. All added items will display in chronological order.</p>
      </div>
      
      <div
      v-for="component in timelineCompatible"
      :key="component.name"
      >
    
        <v-btn
        class="mb-2"
        min-width="200px"
        rounded
        dark
        v-if="userData[component.name.toLowerCase()]"
        :color="component.selected ? 'green' : 'red'"
        @click.stop="component.selected = !component.selected"
        >{{ component.name }}
        </v-btn>

      </div>
      <!-- <h3>Add a theme</h3> -->
    </div>

  </div>

</template>

<script>
import Toolbar from '../../ReusableComponents/CreateToolbar.vue'

export default {
  components: { Toolbar },
  props: ['userData'],
  mounted() {
    if (this.userData.timeline.content.length > 0) {
      this.timelineCompatible.forEach(item => {
        if (this.userData.timeline.content.includes(item.name.toLowerCase())) {
          item.selected = true;
        }
      })
    }
  },
  destroyed() {
    this.emitDataToGrandparent();
  },
  data() {
    return {
      timelineCompatible: [
        {name: 'Experiences', selected: false}, 
        {name: 'Education', selected: false}, 
        {name: 'Accomplishments', selected: false},
        {name: 'Projects', selected: false}
      ]
    }
  },
  methods: {
    
    emitDataToGrandparent() {

      const selectedComponents = this.timelineCompatible
      .filter(component => component.selected)
      .map(component => component.name.toLowerCase())
      
      this.$parent.$emit('update-component-data', {
        componentType: 'timeline',
        content: selectedComponents
      });
    }
  },

}
</script>