<template>
  <div>

    <button @click="addProject()">Add Project</button>
    <br>
    <div v-for="(project, index) in projects" :key="project.id">
      <div class="center" style="flex-direction: row;">
        <input type="text" placeholder="Name" v-model="projects[index].name" />
        <input type="text" placeholder="Tech Used" v-model="projects[index].technologies" />
        <input type="text" placeholder="Deployment URL" v-model="projects[index].linkToDeploy" />
        <input type="text" placeholder="Repo URL" v-model="projects[index].linkToRepo" />
        <input type="text" placeholder="Desc." v-model="projects[index].description" />
        <input type="text" placeholder="Date" v-model="projects[index].date" />
        <button @click="removeProject(index)">x</button>
        <!-- <button @click="test(projects[index])">Test</button> -->
      </div>
    </div>

    <b-button @click="$parent.editComponentView = false; emitDataToGrandparent()">Back</b-button>

  </div>
</template>

<script>
export default {
  props: [
    'userData'
  ],
  created() {
    if (this.userData?.projects) this.projects = this.userData.projects.content;
  },
  data: () => {
    return {
      projects: []
    }
  },
  methods: {
    test(item) {
      console.log(item)
    },
    removeProject(index) {
      this.projects.splice(index, 1);
    },
    addProject() {
      this.projects.push({
        name: '',
        technologies: [],
        linkToDeploy: '',
        linkToRepo: '', 
        description: '',
        date: ''
      })
    },
    emitDataToGrandparent() {
      this.$parent.$emit('update-component-data', {
        componentType: 'projects',
        content: this.projects
      });
    }
  }
}
</script>

<style scoped>
  div {
    background-color: rgb(213, 191, 240);
  }
</style>