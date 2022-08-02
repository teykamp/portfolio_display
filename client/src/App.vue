<template>
  <div>
    <v-app>
      <router-view :key="showSessionRestorationDialog" />
      <DialogBox 
        :visible="showSessionRestorationDialog"
        :title="'Restore Previous Session?'"
        :description="'We have detected that you previously worked on a portfolio and did not finish making changes, would you like to restore your session?'"
        :mainBtnText="'Restore'"
        :secondaryBtnText="'Discard'"
        @confirmed="restoreSession"
        @close="dialogClosed"
      />
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DialogBox from './components/ReusableComponents/DialogBox.vue'

export default Vue.extend({
  name: 'App',
  data() {
    return {
      showSessionRestorationDialog: false
    }
  },
  components: {
    DialogBox
  },
  created() {
    if (localStorage?.unsavedSessionData) this.showSessionRestorationDialog = true;
  },
  methods: {
    restoreSession() {
      this.$store.state.portfolioItem = JSON.parse(localStorage.unsavedSessionData);
      this.$router.push('/edit');
    },
    dialogClosed() {
      this.showSessionRestorationDialog = false;
      setTimeout(() => localStorage.removeItem('unsavedSessionData'), 100);
    }
  }
})
</script>

<style>

</style>
