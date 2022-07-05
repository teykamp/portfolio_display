<template>
  <div>

    <div v-if="showIntro">
      <Intro />
    </div>

    <div v-else>
      <Main @update-component-data="updateComponentData($event)" :userData="userData" />
    </div>

    <b-button v-on:click="showIntro = !showIntro">Toggle Intro/Main</b-button>
    
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
      userData: {
        name: '',
        headshotURL: '',
        professionalTitle: '',
        visibility: true
      }
    }
  },
  methods: {
    updateComponentData(dataObject) {
      switch (dataObject.componentType) {
        case 'projects':
          this.userData.projects = { content: dataObject.content };
          break;
        case 'education':
          this.userData.education = { content: dataObject.content };
          break;
        case 'experiences':
          this.userData.experiences = { content: dataObject.content };
          break;
        case 'accomplishments':
          this.userData.accomplishments = { content: dataObject.content };
          break;
        default: throw new Error(`Unrecognized Component Type ${dataObject.componentType}`);
      }
    }
  }
}
</script>