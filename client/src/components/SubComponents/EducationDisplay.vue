<template>
  <div>
    <v-container fill-height class="pa-16">
      <v-row justify="center" class="ma-10">
        <h4>Education</h4>
      </v-row>
      <v-row justify="center">
        <v-col xs="12" sm="10" md="8" lg="6" xl="6">
          <v-expansion-panels inset>
            <v-expansion-panel
              v-for="education in relevantInfo"
              :key="education.id"
            >
              <v-expansion-panel-header class="text-h6"> 
                {{ education.degreeType }} {{ education.degreeField }} 
              </v-expansion-panel-header>
              <v-row class="pl-3 pb-3">
                <p class="ml-5">
                  <v-icon>mdi-map-marker</v-icon> 
                  {{ education.institution }}
                </p>
                <p v-if="education.date" class="ml-5">
                  <v-icon>mdi-calendar</v-icon>
                  {{ education.date }}
                </p>
              </v-row>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                {{ education.description }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: [
    'relevantInfo'
  ]
}
</script>
