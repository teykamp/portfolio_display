<template>
  <div>

    <button @click="addExperience()">Add Experience</button>
    <br>
    <v-container>
      <v-row v-for="(experience, index) in experiences" :key="experience.id">
        
        <div>
          <!-- <div class="center" style="flex-direction: row;">
            <input type="text" placeholder="Title"  />
            <input type="text" placeholder="Company"  />
            <input type="text" placeholder="Company Logo URL" v-model="experiences[index].companyImg" />
            <input type="text" placeholder="Description" v-model="experiences[index].description" />
            <input type="text" placeholder="Date" v-model="experiences[index].date" />
            <button @click="removeExperience(index)">x</button>
          </div> -->
          <v-spacer></v-spacer>
          <v-card>
            <div>
              <v-text-field
                label="Title"
                
                v-model="experiences[index].title"
                hide-details="auto">
              </v-text-field>
              <v-text-field 
                v-model="experiences[index].company"
                label="Company Name">
              </v-text-field>
            </div>
          </v-card>
        </div>
      </v-row>
    </v-container>
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

</style>