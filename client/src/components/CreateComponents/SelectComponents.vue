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
        class="center ma-2 pa-2"
        :style="`background-color: ${component.added ? 'green':'red'}; color: white;`"
        @click.stop="addComponent(index)"
      >
        {{ capitalize(component.name) }}
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '../ReusableComponents/CreateToolbar.vue'

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
          desc: 'you achieved stuff',
        },
        {
          name: 'projects',
          desc: 'stuff you have worked on'
        },
        {
          name: 'education',
          desc: 'schooling you have done'
        },
        {
          name: 'experiences',
          desc: 'work you have done'
        },
        {
          name: 'timeline',
          desc: 'a visual representation of your path through life'
        }
      ],
      rerenderKey: false
    }
  },
  components: {
    Toolbar
  },
  mounted() {
    for (let i in this.components) {
      this.components[i].added = this.selectedComponents.includes(this.components[i].name);
    }

    this.updateComponentDisplay();
  },
  destroyed() {
    const newActiveComponents = this.components
      .filter(comp => comp.added)
      .map(comp => comp.name)
    this.$emit('update-active-components', newActiveComponents);
  },
  methods: {
    capitalize(s) {
      return `${s[0].toUpperCase()}${s.substring(1)}`;
    },
    addComponent(index) {
      this.components[index].added = !this.components[index].added;
      this.updateComponentDisplay();
    },
    updateComponentDisplay() {
      this.rerenderKey = !this.rerenderKey;
    }
  }
}
</script>