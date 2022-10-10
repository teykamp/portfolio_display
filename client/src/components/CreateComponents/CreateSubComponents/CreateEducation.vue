<template>
  <div>

    <Toolbar
      :title="componentTitle" 
      :exitAction="leaveEditView"
      :onAdd="addItem"
      :listLength="items.length"
      :disabledAt="4"
    />

    <div 
      v-show="!items.length" 
      class="center"
    >
      <v-icon large class="mr-2">mdi-book-education-outline</v-icon>
      <div class="text-h6 font-weight-normal">Added Institutions Go Here</div>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(institution, index) in items" 
          :key="institution.id"
        >
          <CardWrapper
            placeholder="Name of School"
            :missingInfo="!validate(institution)"
            :title="institution.institution"
            @update-title="institution.institution = $event"
            @remove="removeItem(index)"
          >
            <template>  
              <v-autocomplete
                label="Degree Type *"
                :items="degreeTypes"
                v-model="institution.degreeType"
                :rules="[required]"
              ></v-autocomplete>

              <v-text-field
                v-if="displayDegreeField(index)"
                label="Degree Field *"
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
  data() {
    return {
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
      if (this.items[i].degreeType == 'High School') this.items[i].degreeField = '';
      // returns conditional based on whether degreeField is required
      return this.items[i].degreeType != 'High School' && this.items[i].degreeType;
    },
    addItem() {
      this.items.push(new Education());
    }
  }
}
</script>