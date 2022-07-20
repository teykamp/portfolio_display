<template>
  <div>

    <Toolbar 
    :title="'Experiences'" 
    :exitAction="() => $parent.editComponentView = false"
    :onAdd="() => addExperience()"
    :listLength="experiences.length"
    :disabledAt="4"
    />

    <div v-show="experiences.length === 0" style="display: flex; align-items: center; justify-content: center;">
      <v-icon large class="mr-2">mdi-file-document-plus-outline</v-icon>
      <span style="font-size: 16pt">Added Experiences Go Here</span>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <!-- <TransitionGroup name="list"> -->
        <v-col 
        class="col-sm-12 col-md-6"
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
              <div class="center">
                <v-btn 
                class="mb-2" 
                small @click="experiences[index].date = ''" 
                :style="`${experiences[index].date ? 'opacity: 1' : 'opacity: 0; cursor: default'}`"
                >
                  Clear
                </v-btn>
                <v-date-picker type="month" v-model="experiences[index].date" header-color="primary"
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
import Toolbar from '../../ReusableComponents/CreateToolbar.vue'

export default {
  components: { Toolbar },
  props: [
    'userData'
  ],
  created() {
    if (this.userData?.experiences) this.experiences = this.userData.experiences.content;
  },
  destroyed() {
    this.emitDataToGrandparent();
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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
</style>