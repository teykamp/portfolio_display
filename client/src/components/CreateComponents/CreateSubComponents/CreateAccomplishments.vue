<template>
  <div>

    <Toolbar 
      :title="componentTitle" 
      :exitAction="() => $parent.editComponentView = false"
      :onAdd="addAccomplishment"
      :listLength="accomplishments.length"
      :disabledAt="8"
    />

    <div 
      v-show="accomplishments.length === 0" 
      style="display: flex; align-items: center; justify-content: center;"
    >
      <v-icon large class="mr-2">mdi-trophy</v-icon>
      <span style="font-size: 16pt">Added Accomplishments Go Here</span>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <v-col 
          class="col-sm-12 col-md-6"
          v-for="(accomplishment, index) in accomplishments" 
          :key="accomplishment.id"
        >
          <CardWrapper
            :missingInfo="missingInfo(accomplishment)"
            :title="accomplishment.title"
            @update-title="accomplishment.title = $event"
            @remove="removeAccomplishment(index)"
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
  created() {
    this.accomplishments = this.userData.accomplishments.content || [];
  },
  data: () => {
    return {
      accomplishments: []
    }
  },
  methods: {
    removeAccomplishment(index) {
      this.accomplishments.splice(index, 1);
    },
    addAccomplishment() {
      this.accomplishments.push(new Accomplishment())
    },
    missingInfo(accomplishment) {
      return !Accomplishment.validate(accomplishment)
    },
    emitData() {
      this.$emit('update-component-data', {
        componentType: 'accomplishments',
        content: this.accomplishments
      });
    }
  }
}
</script>