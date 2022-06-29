<template>
  <div>

    <div v-if="componentType === 'Achievements'">
      <Achievements :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Projects'">
      <Projects :relevantInfo="relevantInfo" />
    </div>

    <div v-else-if="componentType === 'Education'">
      <Education :relevantInfo="relevantInfo" />
    </div>

    <!-- Fallback -->
    <div v-else>
      <p>Error, Unrecognized Component Type '{{ componentType }}' in Factory!</p  >
    </div>

  </div>
</template>

<script>
import Achievements from './SubComponents/AchievementsDisplay.vue'
import Projects from './SubComponents/ProjectsDisplay.vue'
import Education from './SubComponents/EducationDisplay.vue'

export default {
  components: {
    Achievements,
    Projects,
    Education
  },
  props: [
    'componentType',
    'relevantInfo'
  ]
}
</script>

<style>


</style>

