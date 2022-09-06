<template>
  <div>
    <v-btn @click.stop="showHelpDialog = true">
      help
    </v-btn>
    <v-btn @click.stop="addAction">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <StepByStep 
      :visible="showHelpDialog" 
      @close-dialog="showHelpDialog = false"
    />
  </div>
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

<style>

</style>