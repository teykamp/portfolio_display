<template>
  <div>

    <Toolbar 
    :title="'Accomplishments'" 
    :exitAction="() => $parent.editComponentView = false"
    :onAdd="() => addAccomplishment()"
    :listLength="accomplishments.length"
    :disabledAt="8"
    />

    <div v-show="accomplishments.length === 0" style="display: flex; align-items: center; justify-content: center;">
      <v-icon large class="mr-2">mdi-trophy</v-icon>
      <span style="font-size: 16pt">Added Accomplishments Go Here</span>
    </div>
    
    <v-container fill-height fluid>
      <v-row>
        <!-- <TransitionGroup name="list"> -->
        <v-col 
        class="col-sm-12 col-md-6"
        v-for="(accomplishment, index) in accomplishments" :key="accomplishment.id">
          <v-card>
            
            <div class="pa-4 pt-0">

              <v-row>
                <div class="ml-3 mt-7" v-if="missingInfo(accomplishment)">
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
                  v-model="accomplishments[index].title" 
                  placeholder="Enter Title"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ accomplishments[index].title }}</v-text-field>
                </v-col>

                <v-spacer></v-spacer>

                <v-hover v-slot="{ hover }">
                  <v-icon large right class="mb-7 mr-1" @click="removeAccomplishment(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                </v-hover>            
              </v-row>

              <v-text-field
                label="Organization Name"
                v-model="accomplishments[index].organization">
              </v-text-field>
              <v-textarea
                color="blue"
                :label="`Add a Description (${accomplishments[index].description.length}/3000)`"
                no-resize
                maxlength="3000"
                v-model="accomplishments[index].description"
              ></v-textarea>

              <Calender
                :providedDate="accomplishments[index].date"
                @date-updated="accomplishments[index].date = $event"
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
import Accomplishment from '../../../utils/PortfolioSchemas/Accomplishments'

export default {
  props: [
    'userData'
  ],
  components: {
    Toolbar,
    Calender
  },
  created() {
    if (this.userData?.accomplishments) this.accomplishments = this.userData.accomplishments.content;
  },
  destroyed() {
    this.emitDataToGrandparent();
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
    emitDataToGrandparent() {
      this.$parent.$emit('update-component-data', {
        componentType: 'accomplishments',
        content: this.accomplishments
      });
    }
  }
}
</script>

<style scoped>

</style>