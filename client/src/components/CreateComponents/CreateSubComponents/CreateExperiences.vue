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
          <CardWrapper
            :placeholder="'Experience Title'"
            :missingInfo="missingInfo(experience)"
            :title="experience.title"
            @update-title="experience.title = $event"
            @remove="removeExperience(index)"
          >
            <template>
              <v-text-field 
                label="Company Name"
                :rules="[required]"
                v-model="experience.company">
              </v-text-field>
              <v-text-field 
                color="orange"
                label="Company Logo URL"
                v-model="experience.companyImg">
              </v-text-field>
              <v-textarea
                color="blue"
                :label="`Add a Description (${experience.description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="experience.description"
              ></v-textarea>

              <Calender
                :providedDate="experience.date"
                @date-updated="experience.date = $event"
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