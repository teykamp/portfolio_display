<template>
  <div>

    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
      <v-icon @click="$parent.editComponentView = false; emitDataToGrandparent()">mdi-chevron-left</v-icon>
      <span style="font-weight: bold; font-size: 15pt;" class="ml-1">Accomplishments</span>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="addAccomplishment()" :disabled="accomplishments.length === 8">
        <v-icon>mdi-plus</v-icon>
        <span class="d-none d-sm-flex">Add Accomplishments ({{ accomplishments.length }}/8)</span>
      </v-btn>
    </v-toolbar>

    <div style="width: 100vw; height: 10vh;"></div>

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
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <v-text-field 
                  v-model="accomplishments[index].title" 
                  placeholder="Enter Title"
                  style="font-weight: bold; font-size: 18pt;"
                  outlined
                  clearable
                  color="blue"
                  >{{ accomplishments[index].title }}</v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-hover v-slot="{ hover }">
                    <v-icon large right class="mb-7" @click="removeAccomplishment(index)" color="error">{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
                  </v-hover>
                </v-col>
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
              <div class="center">
                <v-btn 
                class="mb-2" 
                small @click="accomplishments[index].date = ''" 
                :style="`${accomplishments[index].date ? 'opacity: 1' : 'opacity: 0; cursor: default'}`"
                >
                  Clear
                </v-btn>
                <v-date-picker type="month" v-model="accomplishments[index].date" header-color="primary"
                color="secondary"></v-date-picker>
              </div>
            </div>
            
          </v-card>
          
        </v-col>
        <!-- </TransitionGroup> -->
            
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  props: [
    'userData'
  ],
  created() {
    if (this.userData?.accomplishments) this.accomplishments = this.userData.accomplishments.content;
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
      this.accomplishments.push({
        title: '',
        organization: '',
        description: '',
        date: ''
      })
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