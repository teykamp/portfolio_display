<template>
  <div>

    <button @click="addExperience()">Add Experience</button>
    <br>
    <v-container fill-height fluid >
      <v-row>
        <v-col 
        cols="4"
        v-for="(experience, index) in experiences" :key="experience.id">
          <v-card>
            
            <div class="pa-4 pt-0">
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <v-text-field 
                  v-model="experiences[index].title" 
                  placeholder="Enter Title"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ experiences[index].title }}</v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-hover v-slot="{ hover }">
                    <v-icon large right class="mb-7" @click="removeExperience(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                  </v-hover>
                </v-col>
              </v-row>
              <v-text-field 
                label="Company Name"
                v-model="experiences[index].company">
              </v-text-field>
              <v-text-field 
                color="orange"
                label="Company Logo URL"
                v-model="experiences[index].companyImg">
              </v-text-field>
              <v-textarea
                color="blue"
                :label="`Add a Description (${experiences[index].description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="experiences[index].description"
              ></v-textarea>
              <v-row align="center" justify="center">
                <v-col>
                  <v-spacer></v-spacer>
                  <v-date-picker type="month" v-model="experiences[index].date" header-color="primary"
                  color="green lighten-1"></v-date-picker>
                </v-col>
              </v-row>
            </div>
            
          </v-card>
        </v-col>
      
          <!-- <div class="center" style="flex-direction: row;">
            <input type="text" placeholder="Title"  />
            <input type="text" placeholder="Company"  />
            <input type="text" placeholder="Company Logo URL" v-model="experiences[index].companyImg" />
            <input type="text" placeholder="Description" v-model="experiences[index].description" />
            <input type="text" placeholder="Date" v-model="experiences[index].date" />
            <button @click="removeExperience(index)">x</button>
          </div> -->
            
      </v-row>
    </v-container>
    
    <br><br><br><br>
    <v-btn style="position: fixed; bottom: 5%; right: 50%; left: 50%;" class="px-12" color="error" @click="$parent.editComponentView = false; emitDataToGrandparent()">Back</v-btn>
      

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
        title: 'New Experience',
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