<template>
  <div>

    <Toolbar 
      :title="'Timeline'"
      :exitAction="() => $parent.editComponentView = false"
      :disableAddBtn="true"
    />
    
    <div class="center">
  
      <div class="text-h4 mb-5">Select Components</div>
      <div
        v-for="component in compatibleComponents"
        :key="component.id"
      >
        <v-btn
          class="mb-2"
          min-width="200px"
          rounded
          dark
          :color="btnColor(component)"
          @click.stop="toggleSelected(component)"
        >{{ component }}</v-btn>
      </div>
    </div>
    
    <div class="center">
      <p v-if="compatibleComponents.length === 0">Added Components Show Up Here</p>
    </div>

    <v-banner
      class="btm-disclaimer"
      icon="mdi-help"
      color="grey lighten-3"
      :style="bannerStyle"
    >
      Items with dates specified will be added. Once added, items will appear in chronological order.
    </v-banner>

  </div>

</template>

<script>
import CreateMixin from './CreateMixin'

export default { 
  mixins: [
    CreateMixin
  ],
  props: {
    selectedComponents: Array
  },
  mounted() {
    this.userData.timeline.content.forEach(item => this.timelineCompatible[item] = true);
    setTimeout(() => this.showBanner = true, 500);
  },
  data() {
    return {
      timelineCompatible: {
        experiences: false,
        accomplishments: false,
        education: false,
        projects: false
      },
      showBanner: false,
      anySelected: false
    }
  },
  computed: {
    bannerStyle() {
      return this.showBanner ? 'opacity: 1' : 'opacity: 0';
    },
    compatibleComponents() {
      return this.selectedComponents
        .filter((item) => Object.keys(this.timelineCompatible).includes(item));
    }
  },
  methods: {
    btnColor(componentName) {
      return this.timelineCompatible[componentName] ? 'green' : 'red';
    },
    toggleSelected(componentName) {
      this.timelineCompatible[componentName] = !this.timelineCompatible[componentName];
    },
    emitData() {
      const selectedComponents = Object.keys(this.timelineCompatible)
        .filter((key) => this.timelineCompatible[key])
      
      this.$emit('update-component-data', {
        componentType: 'timeline',
        content: selectedComponents
      });
    }
  }
}
</script>

<style scoped>
  .btm-disclaimer {
    position: fixed;
    bottom: 0;
    transition: 500ms;
    width: 100%;
  }
</style>