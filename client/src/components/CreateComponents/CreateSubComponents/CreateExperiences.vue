<template>
  <div>

    <button @click="addExperience()">Add Experience</button>
    <br>
    <div v-for="(experience, index) in experiences" :key="experience.id">
      <div class="center" style="flex-direction: row;">
        <input type="text" placeholder="Title" v-model="experiences[index].title" />
        <input type="text" placeholder="Company" v-model="experiences[index].company" />
        <input type="text" placeholder="Company Logo URL" v-model="experiences[index].companyImg" />
        <input type="text" placeholder="Description" v-model="experiences[index].description" />
        <input type="text" placeholder="Date" v-model="experiences[index].date" />
        <button @click="removeExperience(index)">x</button>
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
    if (this.userData?.experiences) this.experiences = this.userData.experiences.content;
  },
  data: () => {
    return {
      experiences: []
    }
  },
  methods: {
    removeExperience(index) {
      this.experiences.splice(index, 1);
    },
    addExperience() {
      this.experiences.push({
        title: '',
        company: '',
        companyImg: '',
        description: '',
        date: ''
      })
    },
    emitDataToGrandparent() {
      this.$parent.$emit('update-component-data', {
        componentType: 'experiences',
        content: this.experiences
      });
    }
  }
}
</script>

<style scoped>
div {
  background-color: rgb(29, 184, 189);
}
</style>