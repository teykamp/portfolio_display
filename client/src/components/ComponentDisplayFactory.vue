<template>
  <div>

    <component :is="componentType" :relevantInfo="relevantInfo"></component>

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

