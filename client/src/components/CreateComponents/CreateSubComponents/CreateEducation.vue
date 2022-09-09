<template>
  <div>

    <Toolbar
      :title="'Education'" 
      :exitAction="() => $parent.editComponentView = false"
      :onAdd="() => addInstitution()"
      :listLength="education.length"
      :disabledAt="4"
    />

    <div 
      v-show="education.length === 0" 
      style="display: flex; align-items: center; justify-content: center;"
    >
      <v-icon large class="mr-2">mdi-book-education-outline</v-icon>
      <span style="font-size: 16pt">Added Institutions Go Here</span>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(institution, index) in education" 
          :key="institution.id"
        >
          <CardWrapper
            placeholder="Name of School"
            :missingInfo="missingInfo(institution)"
            :title="institution.title"
            @update-title="institution.title = $event"
            @remove="removeInstitution(index)"
          >
            <template>  
              <v-autocomplete 
                label="Degree Type"
                :items="degreeTypes"
                v-model="institution.degreeType"
                :rules="[required]"
              ></v-autocomplete>

              <v-text-field 
                v-if="displayDegreeField(index)"
                label="Degree Field"
                v-model="institution.degreeField"
                :rules="[required]"
              ></v-text-field>

              <v-textarea
                color="blue"
                :label="`Add a Description (${institution.description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="institution.description"
              ></v-textarea>

              <Calender
                :providedDate="institution.date"
                @date-updated="institution.date = $event"
              />
            </template>
          </CardWrapper>
        </v-col>            
      </v-row>
    </v-container>

  </div>
</template>

<script>
import CreateMixin from './CreateMixin'
import Education from '../../../utils/PortfolioSchemas/Education'

export default {
  mixins: [
    CreateMixin
  ],
  created() {
    this.education = this.userData.education.content || [];
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
    displayDegreeField(i) {
      // resets degreeField if user selects high school
      if (this.education[i].degreeType == 'High School') this.education[i].degreeField = '';
      // returns conditional based on whether degreeField is required
      return this.education[i].degreeType != 'High School' && this.education[i].degreeType;
    },
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