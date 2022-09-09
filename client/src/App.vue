<template>
  <div id="app">
    <v-app>

      <router-view :key="showSessionRestorationDialog" />

      <DialogBox 
        :visible="showSessionRestorationDialog"
        :title="'Restore Previous Session?'"
        :description="'We have detected that you previously made changes to your portfolio that went unsaved, would you like to restore your session?'"
        :mainBtnText="'Restore'"
        :mainBtnColor="'success'"
        :secondaryBtnText="'Discard'"
        @confirmed="restoreSession"
        @close="dialogClosed"
      />

      <v-snackbar
        v-model="showSnackbar"
        :multi-line="true"
      >
        {{ $store.state.snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-icon
            v-bind="attrs"
            @click.stop="showSnackbar = false"
            class="mr-2"
          >
            mdi-close
          </v-icon>
        </template>
      </v-snackbar>
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
      showSessionRestorationDialog: false,
      showSnackbar: false,
    }
  },
  components: {
    DialogBox
  },
  mounted() {
    // check for snackbar messages committed to vuex, if message exists
    // showSnackbar is set to true and displayed
    this.$watch(() => this.$store.state.snackbarText, (newValue) => {
      this.showSnackbar = !!newValue;
    });
    // check for unresolved session
    if (localStorage?.unsavedSessionData) this.showSessionRestorationDialog = true;
  },
  methods: {
    restoreSession() {
      try {
        this.$store.state.portfolioItem = JSON.parse(localStorage.unsavedSessionData);
      } catch {
        this.$store.state.snackbarText = 'Previous version corrupted. Restoration Unsuccessful.';
        return;
      }
      this.$router.push({ name: 'Build' });
    },
    dialogClosed() {
      this.showSessionRestorationDialog = false;
      setTimeout(() => localStorage.removeItem('unsavedSessionData'), 100);
    }
  },
  watch: {
    showSnackbar(v) {
      // checks if snackbar was closed by user, if so, resets snackbarText
      if (!v) this.$store.state.snackbarText = undefined;
    }
  }
})
</script>
