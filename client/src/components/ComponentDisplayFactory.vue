<template>
  <div>
    <component 
      :is="componentType" 
      :relevantInfo="relevantInfo"
      :backgroundColor="backgroundColor"
    ></component>
  </div>
</template>

<script>
import accomplishments from './SubComponents/AccomplishmentsDisplay.vue'
import projects from './SubComponents/ProjectsDisplay.vue'
import education from './SubComponents/EducationDisplay.vue'
import experiences from './SubComponents/ExperiencesDisplay.vue'
import timeline from './SubComponents/TimelineDisplay.vue'

export default {
  components: {
    accomplishments,
    projects,
    education,
    experiences,
    timeline,
  },
  props: [
    'componentType',
    'relevantInfo',
    'backgroundColor',
  ]
}
</script>

