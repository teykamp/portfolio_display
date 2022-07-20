<template>
  <div>

    <div v-if="componentType === 'Accomplishments'">
      <Accomplishments :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Projects'">
      <Projects :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Education'">
      <Education :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Experiences'">
      <Experiences :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Timeline'">
      <Timeline :relevantInfo="relevantInfo" />
    </div>

    <!-- Fallback -->
    <div v-else>
      <p>Error, Unrecognized Component Type '{{ componentType }}' in Factory!</p  >
    </div>

  </div>
</template>

<script>
import Accomplishments from './SubComponents/AccomplishmentsDisplay.vue'
import Projects from './SubComponents/ProjectsDisplay.vue'
import Education from './SubComponents/EducationDisplay.vue'
import Experiences from './SubComponents/ExperiencesDisplay.vue'
import Timeline from './SubComponents/TimelineDisplay.vue'

export default {
  components: {
    Accomplishments,
    Projects,
    Education,
    Experiences,
    Timeline
  },
  props: [
    'componentType',
    'relevantInfo'
  ]
}
</script>

<style>


</style>

