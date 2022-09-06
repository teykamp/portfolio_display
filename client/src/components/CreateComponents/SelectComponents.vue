<template>
  <div>
    <Toolbar
      :title="'Add Components'"
      :exitAction="() => $parent.editComponentView = false"
      :disableAddBtn="true"
    />
    <div :key="rerenderKey">
      <div 
        v-for="(component, index) in components"
        :key="component.id"
      >
        <InfoCard
          :item="component"
          @toggle-added="toggleAdded(index)"
        />
      </div>
    </div>
    <br><br><br><br><br>
  </div>
</template>

<script>
import Toolbar from '../ReusableComponents/CreateToolbar.vue'
import InfoCard from './InfoCard.vue'

export default {
  props: {
    selectedComponents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      components: [
        {
          name: 'accomplishments',
          desc: 'The perfect way to show your most valuable competitive accolades!'
        },
        {
          name: 'projects',
          desc: 'Flawlessly display software projects you have completed!'
        },
        {
          name: 'education',
          desc: 'Include your academic achievements and degrees earned!'
        },
        {
          name: 'experiences',
          desc: 'Highlight professional internship or work experiences.'
        },
        {
          name: 'timeline',
          desc: 'Display a timeline that chronicals your personal development.'
        }
      ],
      rerenderKey: false
    }
  },
  components: {
    Toolbar,
    InfoCard
  },
  mounted() {
    this.configureSelectedComponents();
  },
  destroyed() {
    const newActiveComponents = this.components
      .filter(comp => comp.added)
      .map(comp => comp.name)
    this.$emit('update-active-components', newActiveComponents);
  },
  methods: {
    configureSelectedComponents() {
      for (let i in this.components) {
        this.components[i].added = this.selectedComponents.includes(this.components[i].name);
      }

      this.updateComponentDisplay();
    },
    toggleAdded(index) {
      if (!this.components[index].added) {
        this.components[index].added = true;
        this.$store.state.snackbarText = `${this.components[index].name} has been added`;
      }

      this.updateComponentDisplay();
    },
    updateComponentDisplay() {
      this.rerenderKey = !this.rerenderKey;
    }
  }
}
</script>