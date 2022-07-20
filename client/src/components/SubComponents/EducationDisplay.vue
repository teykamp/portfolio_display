<template>
  <div>
    <v-sheet 
      width="100%" 
      color="secondary" 
      class="mt-16 pt-8"
    >
      <v-container 
        fluid 
        fill-height
      >
        <v-row justify="center">
          <v-sheet 
            dark 
            color="secondary"
            class="mb-10"
          >
            <h3>Education</h3>
          </v-sheet>
        </v-row>
        <v-row 
          justify="center" 
          class="mb-6"
        >
          <v-timeline
            :dense="$vuetify.breakpoint.smAndDown"
          >
            <v-timeline-item
              v-for="education in relevantInfo"
              :key="education.id"
              fill-dot
            >
              <span slot="opposite">
                <!-- VERIFY ICONS CORRECT ISSUE #13 -->
                <v-icon 
                  v-if="education.degreeType === 'HS'"
                  color="white" 
                  x-large
                >mdi-chair-school</v-icon>
                <v-icon 
                  v-else-if="education.degreeType === 'PhD'"
                  color="white" 
                  x-large
                >mdi-script-text</v-icon>
                <v-icon 
                  v-else
                  color="white" 
                  x-large
                >mdi-school</v-icon>
              </span>
              <v-card class="elevation-2">
                <v-card-title>
                  <!-- FIX WHEN ISSUE #39 -->
                  {{ education.degreeType }} in computer science
                </v-card-title>
                <v-card-subtitle>
                  <v-icon v-if="education.date">mdi-calendar</v-icon>
                  <strong v-if="education.date"> {{ education.date }} </strong>
                  <v-icon>mdi-map-marker</v-icon>
                  {{ education.institution }} 
                </v-card-subtitle>
                <v-card-text>
                  {{ education.description }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: [
    'relevantInfo'
  ]
}
</script>
