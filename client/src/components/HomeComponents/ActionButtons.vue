<template>
  <div :class="`action-btns pl-2 pr-${sm ? '2':'10'} pt-2`">
    <div 
      v-for="section in sections" 
      :key="section"
    >
      <div
        @click.stop="select(section)"
        :style="selectedStyle(section)"
        :class="`text-${sm ? 'p':'h4'} mx-${sm ? '1':'8'} pa-1 px-${sm ? '1':'3'} action-btn`"
      >{{ section }}</div>
    </div>
    <v-spacer></v-spacer>
    <div 
      @click.stop="login"
      :class="`text-${sm ? 'p':'h4'} pa-1 action-btn`"
    >{{ profileBtnText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    sections: Array,
    currentSection: String
  },
  emits: {
    updateCurrentSection: String
  },
  computed: {
    sm() {
      return !this.$vuetify.breakpoint.mdAndUp;
    },
    profileBtnText() {
      return localStorage.getItem('username') || 'login'
    }
  },
  methods: {
    selectedStyle(section) {
      if (section === this.currentSection) {
        return 'color: black; background: rgba(255,255,255,0.85); border-radius: 10px;'
      }
    },
    select(section) {
      this.$emit('updateCurrentSection', section)
    },
    login() {
      this.$router.push({
        name: 'Auth',
        query: {
          type: 'login'
        }
      })
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