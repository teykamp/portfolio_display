<template>
  <div>

    <Toolbar 
      :title="componentTitle" 
      :exitAction="leaveEditView"
      :onAdd="addItem"
      :listLength="items.length"
      :disabledAt="8"
    />

    <div 
      v-show="!items.length" 
      class="center"
    >
      <v-icon large class="mr-2">mdi-trophy</v-icon>
      <div class="text-h6 font-weight-normal">Added Accomplishments Go Here</div>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(accomplishment, index) in items" 
          :key="accomplishment.id"
        >
          <CardWrapper
            :missingInfo="missingInfo(accomplishment)"
            :title="accomplishment.title"
            @update-title="accomplishment.title = $event"
            @remove="removeItem(index)"
          >
            <template>
              <v-text-field
                label="Organization Name"
                v-model="accomplishment.organization"
              ></v-text-field>
              <v-textarea
                color="blue"
                :label="`Add a Description (${accomplishment.description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="accomplishment.description"
              ></v-textarea>

              <Calender
                :providedDate="accomplishment.date"
                @date-updated="accomplishment.date = $event"
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
import Accomplishment from '../../../utils/PortfolioSchemas/Accomplishments'

export default {
  mixins: [
    CreateMixin
  ],
  methods: {
    addItem() {
      this.items.push(new Accomplishment())
    },
    missingInfo(accomplishment) {
      return !Accomplishment.validate(accomplishment)
    }
  }
}
</script>