<template>
  <div>

    <div v-for="data in testData" :key="data.id">
      <component-display-factory :relevantInfo="data.info" :componentType="data.type" />
    </div>
    {{ user }}
  </div>
</template>

<script>
import ComponentDisplayFactory from '../components/ComponentDisplayFactory.vue'
import DatabaseServices from '../DatabaseServices'

export default {

  components: {
    ComponentDisplayFactory
  },
  async created() {
    console.log(this.$route.params.user)
    this.user = await DatabaseServices.getUserByUsername(this.$route.params.user);
  },
  data: () => {
    return {
      testData: [{type: 'Achievements', info: "I've done big things!"}, {type: 'Projects', info: "I've made big things!"}, {type: 'Education', info: "I've learned big things!"}],
      user: undefined
    }
  }
}
</script>


