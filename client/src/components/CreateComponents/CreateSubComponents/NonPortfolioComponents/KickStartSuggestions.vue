<template>
  <v-row 
    align="center" 
    justify="center"
    class="mt-4"
  >
    <span>
      <span class="mx-2">Add some components</span>
      <v-btn
        @click.stop="addAction"
        color="green"
        fab
        x-small
        dark
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </span>

    <span>
      <span class="mx-2">or find out how to get off the ground</span>
      <v-btn
        color="cyan darken-1"
        dark
        fab
        x-small
        @click.stop="showHelpDialog = true"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </span>


    <StepByStep 
      :visible="showHelpDialog" 
      @close-dialog="showHelpDialog = false"
    />
    
  </v-row>
</template>

<script>
import StepByStep from './StepByStep.vue'

export default {
  props: {
    addAction: {
      type: Function,
      required: true
    }
  },
  components: {
    StepByStep
  },
  data() {
    return {
      showHelpDialog: false
    }
  }
}
</script>