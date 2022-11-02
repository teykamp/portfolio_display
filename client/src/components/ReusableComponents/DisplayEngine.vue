<template>
  <div>
    <div v-for="">

    </div>
  </div>
</template>

<script>
import Header from '../PortfolioHeader.vue'
import Footer from '../PortfolioFooter.vue'
import Projects from '../SubComponents/ProjectsDisplay.vue'
import Accomplishments from '../SubComponents/AccomplishmentsDisplay.vue'
import Experiences from '../SubComponents/ExperiencesDisplay.vue'
import Timeline from '../SubComponents/TimelineDisplay.vue'
import Education from '../SubComponents/EducationDisplay.vue'

export default {
  components: {
    Header,
    Footer,
    Projects,
    Accomplishments,
    Experiences,
    Timeline,
    Education
  },
  props: {
    portfolio: {
      required: true,
      type: Object
    }
  },
  mounted() {

  }
}
</script>