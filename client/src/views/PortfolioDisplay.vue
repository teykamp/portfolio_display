<template>
  <div>

    <!-- Error With Profile Display -->
    <div v-if="errorDisplay">
      <ErrorDisplay :userError="errorDisplay" :userName="this.user.name" />
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

import ErrorDisplay from '../components/ErrorDisplay.vue'

export default {

  components: {
    ComponentDisplayFactory,
    ErrorDisplay
  },
  async created() {

    this.user = await DatabaseServices.getUserByUsername(this.$route.params.user);

    // There has been an issue connecting with our servers, this may be an internet connectivity issue.
    if (!this.user) return this.errorDisplay = 'no server conection';
    // "user not found"
    if (this.user?.error) return this.errorDisplay = this.user.error;
    // This portfolio has been marked as private, contact ${this.user.name} to gain access!
    if (!this.user.visibility) return this.errorDisplay = 'account set private';

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


