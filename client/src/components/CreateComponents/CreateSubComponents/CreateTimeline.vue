<template>
  <div>

    <Toolbar 
    :title="'Timeline'"
    :exitAction="() => $parent.editComponentView = false"
    :disableAddBtn="true"
    />
    
    <div class="center">
      <h1>Select which components to add to timeline</h1>
      <v-container>
        <v-row align="center" justify="center">
          <v-col
          v-for="component in timelineCompatible"
          :key="component.name"
          >
            <v-checkbox
            :label="component.name"
            v-if="userData[component.name.toLowerCase()]"
            v-model="component.selected"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <h3>Add a theme</h3>
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