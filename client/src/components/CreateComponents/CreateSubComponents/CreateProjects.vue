<template>
  <div>

    <button @click="addProject()">Add Project</button>
    <br>
    <div v-if="!techView">
      <div v-for="(project, index) in projects" :key="project.id">
        <div class="center" style="width: 75vw;">
          <input type="text" placeholder="Name" v-model="projects[index].name" />
          <button @click="editTechUsed(project)">Add Technologies Used ({{ projects[index].technologies.length }})</button>
          <input type="text" placeholder="Deployment URL" v-model="projects[index].linkToDeploy" />
          <input type="text" placeholder="Repo URL" v-model="projects[index].linkToRepo" />
          <input type="text" placeholder="Desc." v-model="projects[index].description" />
          <input type="text" placeholder="Date" v-model="projects[index].date" />
          <button @click="removeProject(index)">x</button>
          <!-- <button @click="test(projects[index])">Test</button> -->
        </div>
      </div>
    </div>
    
    <div v-else>
      <h3>Add Technologies Used{{ !projectSelected.name ? '' : ` For ${projectSelected.name}` }}</h3>
      <button @click="projectSelected.technologies.push('')">+</button>
      <div v-for="(tech, index) in projectSelected.technologies" :key="tech.id">
        <input type="text" placeholder="Technology Name" v-model="projectSelected.technologies[index]">
        <button @click="projectSelected.technologies.splice(index, 1)">x</button>
      </div>
      <button @click="techView = false">Return to Projects</button>
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
      projects: [],
      techView: false,
      projectSelected: ''
    }
  },
  methods: {
    test(item) {
      console.log(item)
    },
    editTechUsed(project) {
      this.projectSelected = project;
      this.techView = true;
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