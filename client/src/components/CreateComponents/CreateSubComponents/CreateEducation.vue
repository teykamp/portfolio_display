
<template>
  <div>

    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
      <v-icon @click="$parent.editComponentView = false; emitDataToGrandparent()">mdi-chevron-left</v-icon>
      <span style="font-weight: bold; font-size: 15pt;" class="ml-1">Education</span>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="addInstitution()" :disabled="education.length === 4">
        <v-icon>mdi-plus</v-icon>
        <span class="d-none d-sm-flex">Add Education ({{ education.length }}/4)</span>
      </v-btn>
    </v-toolbar>

    <div style="width: 100vw; height: 10vh;"></div>

    <div v-show="education.length === 0" style="display: flex; align-items: center; justify-content: center;">
      <v-icon large class="mr-2">mdi-book-education-outline</v-icon>
      <span style="font-size: 16pt">Added Institutions Go Here</span>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <!-- <TransitionGroup name="list"> -->
        <v-col 
        class="col-sm-12 col-md-6"
        v-for="(institution, index) in education" :key="institution.id">
          <v-card>
            
            <div class="pa-4 pt-0">
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <v-text-field 
                  v-model="education[index].institution" 
                  placeholder="Enter Institution"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ education[index].institution }}</v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-hover v-slot="{ hover }">
                    <v-icon large right class="mb-7" @click="removeInstitution(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                  </v-hover>
                </v-col>
              </v-row>
              <v-text-field 
                label="Degree Type"
                v-model="education[index].degreeType">
              </v-text-field>
              <v-text-field 
                label="Degree Field"
                v-model="education[index].degreeField">
              </v-text-field>
              <v-textarea
                color="blue"
                :label="`Add a Description (${education[index].description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="education[index].description"
              ></v-textarea>
              <div class="center">
                <v-btn 
                class="mb-2" 
                small @click="education[index].date = ''" 
                :style="`${education[index].date ? 'opacity: 1' : 'opacity: 0; cursor: default'}`"
                >
                  Clear
                </v-btn>
                <v-date-picker type="month" v-model="education[index].date" header-color="primary"
                color="secondary"></v-date-picker>
              </div>
            </div>
            
          </v-card>
          
        </v-col>
        <!-- </TransitionGroup> -->
            
      </v-row>
    </v-container>

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
        degreeField: '',
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

</style>