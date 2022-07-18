<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Need Help?
        </v-btn>
      </template>

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
            Drag the portfolio items you want to include in your portfolio into 'my porfolio'.
          </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
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
            Click on the different components you added to your portfolio to fill in and edit the content displayed in those components.
          </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
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
              Rearrange your porfolios visual hierachy by simply dragging each component into the order you best see fit.
            </v-card-text>
          </v-card>

          <v-btn @click="dialog = false; e1 = 1" text>
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
  data: function() {
    return {
      e1: 1,
      dialog: false
    }
  }
}
</script>