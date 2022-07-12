<template>
  <div>

    <div v-if="showIntro">
      <Intro />
    </div>

    <div v-else>
      <Main @update-component-data="updateComponentData($event)" :userData="userData" />
    </div>

    <b-button v-on:click="showIntro = !showIntro">Toggle Intro/Main</b-button>
    <b-button variant="primary" @click="sendUserToPreview()">Preview Your Portfolio</b-button>

    <pre>
      {{ userData }}
    </pre>
  </div>
</template>

<script>
import Intro from '../components/CreateComponents/CreateIntro.vue'
import Main from '../components/CreateComponents/CreateMain.vue'

export default {
  components: {
    Main,
    Intro
  },
  data: () => {
    return {
      showIntro: true,
      userData: 
      {
        name: '',
        headshotURL: '',
        professionalTitle: '',
        visibility: true
      }
    }
  },
  methods: {
    updateComponentData(dataObject) {
      this.userData[dataObject.componentType].content = dataObject.content;
    },
    sendUserToPreview() {
      this.$router.push({ name: 'PortfolioDisplayPreview', params: { data: this.userData }});
    }
  }
}
</script>