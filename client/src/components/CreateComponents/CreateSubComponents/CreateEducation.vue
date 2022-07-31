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

              <v-row>
                <div class="ml-3 mt-7" v-if="missingInfo(institution)">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"                  
                      >
                        mdi-alert
                      </v-icon>
                    </template>
                    <span>Missing required information</span>
                  </v-tooltip>     
                </div>

                <v-col cols="9">
                  <v-text-field 
                  v-model="education[index].institution" 
                  placeholder="Enter Institution"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ education[index].institution }}</v-text-field>
                </v-col>

                <v-spacer></v-spacer>

                <v-hover v-slot="{ hover }">
                  <v-icon large right class="mb-7 mr-1" @click="removeInstitution(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                </v-hover>            
              </v-row>

              <v-autocomplete 
                label="Degree Type"
                :items="degreeTypes"
                v-model="education[index].degreeType">
              </v-autocomplete>

              <v-text-field 
                v-if="education[index].degreeType != 'High School' && education[index].degreeType"
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
import Education from '../../../utils/PortfolioSchemas/Education'

export default {
  components: {
    Toolbar,
    Calender
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  destroyed() {
    this.emitData();
  },
  created() {
    if (this.userData?.education) this.education = this.userData.education.content;
  },
  data: () => {
    return {
      education: [],
      degreeTypes: [
        'High School',
        'MA',
        'BA',
        'BS',
        'JD',
        'MD',
        'PhD'
      ]
    }
  },
  methods: {
    removeInstitution(index) {
      this.education.splice(index, 1);
    },
    missingInfo(obj) {
      return !Education.validate(obj);
    },
    addInstitution() {
      this.education.push(new Education());
    },
    emitData() {
      this.$emit('update-component-data', {
        componentType: 'education',
        content: this.education
      });
    }
  }
}
</script>