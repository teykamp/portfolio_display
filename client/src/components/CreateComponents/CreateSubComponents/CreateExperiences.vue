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
      <v-icon large class="mr-2">mdi-file-document-plus-outline</v-icon>
      <div class="text-h6 font-weight-normal">Added Experiences Go Here</div>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(experience, index) in items" 
          :key="index"
        >
          <CardWrapper
            placeholder="Experience Title"
            :missingInfo="missingInfo(experience)"
            :title="experience.title"
            @update-title="experience.title = $event"
            @remove="removeItem(index)"
          >
            <template>
              <v-text-field 
                label="Company Name *"
                :rules="[required]"
                v-model="experience.company"
              ></v-text-field>
              <v-text-field 
                v-model="experience.companyImg"
                color="orange"
                label="Company Logo URL"
              ></v-text-field>
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
  methods: {
    addItem() {
      this.items.push(new Experience())
    },
    missingInfo(obj) {
      return !Experience.validate(obj);
    }
  }
}
</script>