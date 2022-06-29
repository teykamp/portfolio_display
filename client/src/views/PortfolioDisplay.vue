<template>
  <div>

    <div v-for="data in testData" :key="data.id">
      <component-display-factory :relevantInfo="data" :componentType="data" />
    </div>

  </div>
</template>

<script>
import ComponentDisplayFactory from '../components/ComponentDisplayFactory.vue'

export default {

  components: {
    ComponentDisplayFactory
  },

  data: () => {
    return {
      testData: ['Achievements', 'Education', 'Projects', 'Achievements', 'Projects', 'IDK', 'lmao', 'greifing']
    }
  }
}
</script>


