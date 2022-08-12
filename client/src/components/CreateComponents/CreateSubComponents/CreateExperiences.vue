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
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(experience, index) in experiences" 
          :key="index"
        >
          <v-card>
            
            <div class="pa-4 pt-0">

              <v-row>
                <div class="ml-3 mt-7" v-if="missingInfo(experience)">
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
                  v-model="experiences[index].title" 
                  placeholder="Enter Title"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ experiences[index].title }}</v-text-field>
                </v-col>

                <v-spacer></v-spacer>

                <v-hover v-slot="{ hover }">
                  <v-icon large right class="mb-7 mr-1" @click="removeExperience(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                </v-hover>            
              </v-row>

              <v-text-field 
                label="Company Name"
                :rules="[required]"
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

              <Calender
                :providedDate="experiences[index].date"
                @date-updated="experiences[index].date = $event"
              />

            </div>
            
          </v-card>
        </v-col>    

      </v-row>
    </v-container>

  </div>
</template>

<script>
import CreateMixin from './CreateMixin'
import Experience from '../../../utils/PortfolioSchemas/Experiences'

export default {
  mixins: [
    CreateMixin
  ],
  created() {
    if (this.userData?.experiences) this.experiences = this.userData.experiences.content;
  },
  data: () => {
    return {
      experiences: [],
    }
  },
  methods: {
    removeExperience(index) {
      this.experiences.splice(index, 1);
    },
    addExperience() {
      this.experiences.push(new Experience())
    },
    missingInfo(obj) {
      return !Experience.validate(obj);
    },
    emitData() {
      this.$emit('update-component-data', {
        componentType: 'experiences',
        content: this.experiences
      });
    }
  }
}
</script>