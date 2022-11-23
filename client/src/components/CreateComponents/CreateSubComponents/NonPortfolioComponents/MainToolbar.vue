<template>
  <div>
    <Toolbar 
      title="My Portfolio"
      :exitAction="intendToExit"
    >
      <template #actions>

        <v-btn
          fab
          dark
          color="green"
          small
          @click.stop="$emit('select-components')"
        > 
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>

        <div v-if="$vuetify.breakpoint.mdAndUp">
          <Buttons 
            :saveState="saveState"
            classes="ml-2"
            :invalidComponents="invalidComponents"
            :loading="loading"
            :actions="actions"
          />
        </div>

        <v-app-bar-nav-icon v-else @click.stop="navMenu = true" />

      </template>
    </Toolbar>

    <!-- Dialog That Contains The Help Steps -->
    <Steps
      :visible="showStepsDialog" 
      @close-dialog="showStepsDialog = false" 
    />

    <!-- Exit Warning Dialog -->
    <DialogBox
      :title="'Hold Up!'" 
      :description="'You are about to leave. Exiting now discard all your unsaved changes. Press the save button to ensure that no work gets lost!'"
      :visible="showExitDialog"
      :mainBtnColor="'green'"
      :dark="true"
      :mainBtnText="'stay'"
      :secondaryBtnText="'leave'"
      @confirmed="preventLeave = true"
      @close="leaveCreateRoute()"
    />

    <!-- Privacy Settings Dialog -->
    <PrivacySettingsDialog 
      :showPrivacySettingsDialog="showPrivacySettingsDialog" 
      @close="showPrivacySettingsDialog = false"
    />

    <!-- Sidebar for mobile devices -->
    <v-navigation-drawer
      v-model="navMenu"
      style="position: fixed;"
      temporary
      right
    >
      <div class="mt-3 ml-3">
        <Buttons 
          :saveState="saveState"
          :invalidComponents="invalidComponents"
          :loading="loading"
          :actions="actions"
          styles="width: 90%"
          classes="my-1"
        />
      </div>
    </v-navigation-drawer>

  </div>
</template>

<script>
// UI Components
import Buttons from './MainToolbarButtons.vue'
import Toolbar from '../../../ReusableComponents/CreateToolbar.vue'

// Dialogs
import Steps from './StepByStep.vue'
import DialogBox from '../../../ReusableComponents/DialogBox.vue'
import PrivacySettingsDialog from './PrivacySettings.vue'

import DatabaseServices from '../../../../DatabaseServices'

export default {
  data() {
    return {
      // temporarily changes state of save button to show successful save
      saveState: false,
      // true when steps dialog is being displayed
      showStepsDialog: false,
      // true when exit dialog is being displayed
      showExitDialog: false,
      // true when user is editing privacy settings via the privacy dialog
      showPrivacySettingsDialog: false,
      // tiggered if leave is prevented in exit dialog
      preventLeave: false,
      // navMenu true when hamburger icon is clicked and mobile navigation is active
      navMenu: false,
      // actions are functions that are executed when a user clicks a button inside Buttons
      actions: [
        this.savePortfolioRemote, 
        this.sendUserToPreview, 
        () => this.showStepsDialog = true,
        () => { this.showPrivacySettingsDialog = true; this.navMenu = false }
      ]
    }
  },
  props: {
    invalidComponents: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    },
    userDataOnStart: {
      type: String,
      required: true
    }
  },
  components: {
    Steps,
    Toolbar,
    DialogBox,
    Buttons,
    PrivacySettingsDialog
  },
  methods: {
    hasDataChanged() {
      return this.userDataOnStart != JSON.stringify(this.userData);
    },
    sendUserToPreview() {
      this.$parent.saveSessionLocally();
      this.$emit('send-to-preview');
    },
    intendToExit() {
      if (this.hasDataChanged()) this.showExitDialog = true;
      else {
        localStorage.removeItem('unsavedSessionData');
        this.$router.push('/');
      }
    },
    leaveCreateRoute() {
      this.showExitDialog = false;
      if (this.preventLeave) return this.preventLeave = false;
      localStorage.removeItem('unsavedSessionData');
      this.$router.push('/');
    },
    async savePortfolioRemote() {
      // checks if user has done anything before using bandwidth to send a bunch of requests
      if (!this.hasDataChanged()) {
        return this.$store.state.snackbarText = 'There is nothing to save!';
      }

      try {
        await DatabaseServices.updatePortfolio(this.userData);
        this.saveState = true;
        this.$store.state.snackbarText = 'Your portfolio has been successfully updated!';
      } catch (error) {
        this.$store.state.snackbarText = 'There has been an issue making contact with our servers. Your work has not been saved';
        console.error('Put request was unsuccessful!', error);
        return;
      }
      
      this.$emit('refresh-userdata-onstart');
      localStorage.removeItem('unsavedSessionData');
    }
  },
  watch: {
    showStepsDialog(v) {
      if (this.$vuetify.breakpoint.smAndUp) return
      this.navMenu = !v;
    },
    showPrivacySettingsDialog(v) {
      if (this.$vuetify.breakpoint.smAndUp) return
      this.navMenu = !v;
    },
    saveState(v) {
      if (v) {
        setTimeout(() => {
          this.saveState = false;
        }, 4000);
      }
    }
  }
}
</script>