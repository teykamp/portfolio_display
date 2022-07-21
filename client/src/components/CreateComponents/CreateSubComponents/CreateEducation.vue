<template>
  <div>

    <Toolbar
    :title="'Education'" 
    :exitAction="() => $parent.editComponentView = false"
    :onAdd="() => addInstitution()"
    :listLength="education.length"
    :disabledAt="4"
    />

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
              <Calender
                :providedDate="education[index].date"
                @date-updated="education[index].date = $event"
              />
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
import Calender from '../../ReusableComponents/CreateCalender.vue'

export default {
  components: {
    Toolbar,
    Calender
  },
  props: [
    'userData'
  ],
  destroyed() {
    this.emitDataToGrandparent();
  },
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