<template>
  <div>
    <v-sheet
      v-if="displayData.length > 0" 
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
            <h3>Timeline</h3>
          </v-sheet>
        </v-row>
        <v-col 
          justify="center" 
          class="mb-6"
          xs="12"
          sm="10"
          md="8"
          lg="6"
          xl="6"
        >
          <v-timeline
            :dense="$vuetify.breakpoint.smAndDown"
          >
            <v-timeline-item
              v-for="(timePoint, index) in displayData"
              :key="timePoint.id"
              :icon="typeIcons[index]"
            >
              <span slot="opposite">
                <strong> {{ displayDate(timePoint.date) }} </strong>
              </span>
              <!-- Education -->
              <v-card 
                v-if="timePoint.type === ComponentType.EDUCATION"
                class="elevation-2"
              >
                <v-container fill-height>
                  <v-card-title 
                    class="text-center pb-7"
                    style="word-break:break-word;"
                  >
                    {{ timePoint.degreeType }} in {{ timePoint.degreeField }}
                  </v-card-title>
                  <v-card-subtitle class="text-center">
                    <v-icon>mdi-map-marker</v-icon>
                    {{ timePoint.institution }} 
                  </v-card-subtitle>
                </v-container>
              </v-card>

              <!-- Experiences -->
              <v-card 
                v-else-if="timePoint.type === ComponentType.EXPERIENCES"
                class="elevation-2" 
              >
                <v-container fill-height>
                  <v-card-title 
                    class="pb-2"
                    style="word-break:break-word;"
                  >
                    {{ timePoint.title }}
                  </v-card-title>
                  <v-row 
                    justify="center"
                    v-if="timePoint.companyImg"
                  >
                    <v-img
                      :src="timePoint.companyImg"
                      aspect-ratio="1"
                      height="60"
                      width="60"
                      contain
                      class="ma-2"
                    ></v-img>
                  </v-row>
                  <v-card-subtitle>
                    <v-icon>mdi-map-marker</v-icon>
                    {{ timePoint.company }}
                  </v-card-subtitle>
                </v-container>
              </v-card>

              <!-- Projects -->
              <v-card 
                v-else-if="timePoint.type === ComponentType.PROJECT"
                class="elevation-2"
              >
                <v-container fill-height>
                  <v-card-title 
                    class="text-center"
                    style="word-break:break-word;"
                  >
                    {{ timePoint.name }}
                  </v-card-title>
                  <v-container class="pa-0">
                    <v-card-subtitle class="text-center pt-0">
                        <v-icon>mdi-head-cog</v-icon>
                        <span 
                          v-for="technology, index in timePoint.technologies" 
                          :key="technology.id">
                          <span v-if="index !== 0"> , </span>
                          {{ technology.name }} 
                        </span>
                    </v-card-subtitle>
                  </v-container>
                </v-container>
              </v-card>

              <!-- Accomplishments -->
              <v-card 
                class="elevation-2" 
                v-else-if="timePoint.type === ComponentType.ACCOMPLISHMENT"
              >
                <v-container fill-height>
                  <v-card-title 
                    class="text-center pb-7 break-word"
                    style="word-break:break-word;"
                  >
                    {{ timePoint.title }}
                  </v-card-title>
                  <v-card-subtitle class="text-center">
                    <v-icon>mdi-office-building-marker</v-icon>
                    {{ timePoint.organization }} 
                  </v-card-subtitle>
                </v-container>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-container>
    </v-sheet>

    <!-- if no data with dates -->
    <v-container v-else>
      <v-alert
        border="left"
        outlined
        text
        type="warning"
      >No items in Timeline have dates. Data cannot be displayed. Please add dates to at least one timeline component</v-alert>
    </v-container>
  </div>
</template>

<script>
import displayDate from "../../utils/DateToText.ts"
import { ComponentType } from "../../utils/PortfolioSchemas/PortfolioEntry"
import ComponentMixin from './componentDisplayMixin'

export default {
  mixins: [
    ComponentMixin
  ],
  data() {
    return {
      // ComponentType enum
      ComponentType,
      // filtered and sorted version of the relevantInfo prop
      displayData: [],
      // icons that are displayed inside the timeline circles
      typeIcons: [],
      // key value pairs that match the object types with mdi-icons
      iconData: {},
      // imported function
      displayDate
    }
  },
  created() {
    const removedNullData = this.data.filter(item => item.date);

    const sortedDataByDate = removedNullData.sort((b, a) => {
      return parseInt(a.date.replace('-', '')) - parseInt(b.date.replace('-', ''));
    });

    this.iconData[ComponentType.PROJECT] = 'mdi-projector-screen';
    this.iconData[ComponentType.EDUCATION] = 'mdi-school';
    this.iconData[ComponentType.ACCOMPLISHMENT] = 'mdi-trophy';
    this.iconData[ComponentType.EXPERIENCES] = 'mdi-briefcase'; 

    this.displayData = sortedDataByDate;

    this.displayData.forEach(item => {
      this.typeIcons.push(this.iconData[item.type]);
    })
  }
}
</script>


