<template>
  <div>

    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
      <v-icon @click.stop="$parent.editComponentView = false; emitDataToGrandparent()">mdi-chevron-left</v-icon>
      <span style="font-weight: bold; font-size: 15pt;" class="ml-1">Timeline</span>
    </v-toolbar>

    <div style="width: 100vw; height: 10vh;"></div>

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

export default {
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