<template>
  <div>

    <button @click="addInstitution()">Add Institution</button>
    <br>
    <div v-for="(institution, index) in education" :key="institution.id">
      <div class="center" style="flex-direction: row;">
        <input type="text" placeholder="Organization" v-model="education[index].institution" />
        <input type="text" placeholder="Description" v-model="education[index].description" />
        <input type="text" placeholder="Degree Type" v-model="education[index].degreeType">
        <input type="text" placeholder="Date" v-model="education[index].date" />
        <button @click="removeInstitution(index)">x</button>
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
    if (this.userData?.education) this.education = this.userData.education.content;
  },
  data: () => {
    return {
      education: []
    }
  },
  methods: {
    removeInstitution(index) {
      this.education.splice(index, 1);
    },
    addInstitution() {
      this.education.push({
        institution: '',
        degreeType: '',
        description: '',
        date: ''
      })
    },
    emitDataToGrandparent() {
      this.$parent.$emit('update-component-data', {
        componentType: 'education',
        content: this.education
      });
    }
  }
}
</script>

<style scoped>
div {
  background-color: rgb(226, 255, 59);
}
</style>