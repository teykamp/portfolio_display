<template>
  <div class="action-btns pl-2 pr-10 pt-2">
    <div 
      v-for="button in buttons" 
      :key="button"
    >
      <div
        @click.stop="select(button)"
        :style="selectedStyle(button)"
        class="text-h4 action-btn mx-8 pa-1"
      >{{ button }}</div>
    </div>
    <v-spacer></v-spacer>
    {{ modelValue}}
    <div class="text-h4 action-btn">login</div>
  </div>
</template>

<script>
export default {
  props: {
    currentSection: String
  },
  emits: {
    updateCurrentSection: String
  },
  data() {
    return {
      buttons: [
        'build',
        'explore',
        'register'
      ]
    }
  },
  methods: {
    selectedStyle(sectionName) {
      if (sectionName === this.currentSection) {
        return 'color: black; background: rgba(255,255,255,0.85); border-radius: 10px;'
      }
    },
    select(sectionName) {
      this.$emit('updateCurrentSection', sectionName)
    }
  }
}
</script>

<style scoped>
.action-btns {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
}
.action-btn {
  font-weight: 900;
  cursor: pointer;
  color: rgb(229, 229, 229);
  transition: 300ms;
}
.action-btn:hover {
  text-decoration: underline;
  color: white;
}
</style>