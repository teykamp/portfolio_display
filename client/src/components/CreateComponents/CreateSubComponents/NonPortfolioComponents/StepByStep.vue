<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Add Items
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Include Detail
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Rearrange
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            class="mb-12"
            color="white"
            height="200px"
            elevation="0"
          >
          <v-card-text>
            Start by clicking on the portfolio items you want to include in your portfolio.
          </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Next
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="white"
            height="200px"
            elevation="0"
          >
          <v-card-text>
            Once added, components can be edited. Each component requires different 
            information to be complete, components that have not met these criteria yet will appear
            with an alert <v-icon small>mdi-alert</v-icon> icon indicating the missing information.
          </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Next
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="white"
            height="200px"
            elevation="0"
          >
            <v-card-text>
              Rearrange your porfolios visual hierachy by dragging 
              each component into the order you best see fit.
              Components with the draggable <v-icon small>mdi-drag-horizontal-variant</v-icon> 
              icon can be reordered.
            </v-card-text>
          </v-card>

          <v-btn @click="e1 = 1; show = false" text>
            Let's Get Going!
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 1
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close-dialog')
        }
      }
    }
  }
}
</script>