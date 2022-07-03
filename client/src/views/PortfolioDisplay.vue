<template>
  <div>

    <!-- Error With Profile Display -->
    <div v-if="errorDisplay">
      <h1>{{ errorDisplay }}</h1>
    </div>

    <!-- Porfolio Display -->
    <div v-else>

      <div v-for="data in testData" :key="data.id">
        <component-display-factory :relevantInfo="data.content" :componentType="data.category" />
      </div>

    </div>

  </div>
</template>

<script>
import ComponentDisplayFactory from '../components/ComponentDisplayFactory.vue'
import DatabaseServices from '../DatabaseServices'
import parseProfileData from '../utils/ParseProfileData'

export default {

  components: {
    ComponentDisplayFactory
  },
  async created() {

    this.user = await DatabaseServices.getUserByUsername(this.$route.params.user);

    if (!this.user) return this.errorDisplay = 'There has been an issue connecting with our servers, this may be an internet connectivity issue.';
    if (this.user?.error) return this.errorDisplay = this.user.error;
    if (!this.user.visibility) return this.errorDisplay = `This portfolio has been marked as private, contact ${this.user.name} to gain access!`;

    this.testData = parseProfileData(this.user);
    console.log(this.testData)

  },
  data: () => {
    return {
      testData: [{type: 'Achievements', info: "I've done big things!"}, {type: 'Projects', info: "I've made big things!"}, {type: 'Education', info: "I've learned big things!"}],
      user: undefined,
      errorDisplay: ''
    }
  }
}
</script>


