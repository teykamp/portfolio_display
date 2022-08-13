<template>
  <div>
    <Toolbar 
      :title="$vuetify.breakpoint.smAndUp ? 'My Portfolio' : ''"
      :exitAction="intendToExit"
    >
      <template #actions>
        <v-btn 
          :disabled="invalidComponents.length != 0" 
          class="mr-2" 
          color="primary" 
          :loading="loading"
          @click.stop="sendUserToPreview()"
        >
          <v-icon class="mr-2">mdi-file-eye-outline</v-icon>
          Preview
        </v-btn>

        <v-btn
          color="cyan darken-1"
          dark
          :loading="loading"
          @click.stop="showStepsDialog = true"
        >
          <v-icon>mdi-help-circle-outline</v-icon>
          <span class="d-none d-sm-flex ml-2">Help</span>
        </v-btn>

        <Steps
          :visible="showStepsDialog" 
          @close-dialog="showStepsDialog = false" 
        />

        <v-btn 
          :disabled="invalidComponents.length != 0" 
          :loading="loading"
          :dark="invalidComponents.length == 0"
          class="ml-2" 
          color="orange darken-1" 
          @click.stop="savePortfolioRemote()"
        >
          Save
        </v-btn>
      </template>
    </Toolbar>

    <div class="mx-3">
      Logged in as {{ username }}
    </div>
 
    <DialogBox
      :title="'Hold Up!'" 
      :description="'You are about to leave. Exiting now will only save the changes you have made locally, which puts them at risk!'"
      :visible="showExitDialog"
      :mainBtnColor="'green'"
      :dark="true"
      :mainBtnText="'stay'"
      :secondaryBtnText="'leave'"
      @confirmed="preventLeave = true"
      @close="leaveCreateRoute()"
    />

  </div>
</template>

<script>
import DatabaseServices from '../../../../DatabaseServices'
import Steps from './StepByStep.vue'
import Toolbar from '../../../ReusableComponents/CreateToolbar.vue'
import DialogBox from '../../../ReusableComponents/DialogBox.vue'

export default {
  data() {
    return {
      // username of logged in account
      username: localStorage.username,
      // true when steps dialog is being displayed
      showStepsDialog: false,
      // true when exit dialog is being displayed
      showExitDialog: false,
      // tiggered if leave is prevented in exit dialog
      preventLeave: false,
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
    DialogBox
  },
  methods: {
    hasDataChanged() {
      return this.userDataOnStart != JSON.stringify(this.userData);
    },
    sendUserToPreview() {
      this.$parent.saveSessionLocally();
      this.$router.push({ name: 'PortfolioDisplayPreview' });
    },
    intendToExit() {
      this.hasDataChanged() ? this.showExitDialog = true : this.$router.push('/');
    },
    leaveCreateRoute() {
      this.showExitDialog = false;
      if (this.preventLeave) return this.preventLeave = false;
      this.$parent.saveSessionLocally();
      this.$router.push('/');
    },
    async savePortfolioRemote() {
      // checks if user has done anything before using bandwidth to send a bunch of requests
      if (!this.hasDataChanged()) {
        return this.$store.state.snackbarText = 'There is nothing to save!';
      }

      // makes get to see if user already has a portfolio
      let userAlreadyHasPortfolio;
      try {
        userAlreadyHasPortfolio = await DatabaseServices.getPortfolioByUsername(this.username);
      } catch (error) {
        this.$store.state.snackbarText = 'Connection error! Work not saved';
        console.error('Get request was unsuccessful!', error);
        return;
      }

      if (userAlreadyHasPortfolio) {
        try {
          await DatabaseServices.updatePorfolio(this.username, this.userData);
          this.$store.state.snackbarText = 'Your portfolio has been successfully updated!';
        } catch (error) {
          this.$store.state.snackbarText = 'There has been an issue making contact with our servers, your work has not been saved';
          console.error('Put request was unsuccessful!', error);
          return;
        }
      } else {
        try {
          await DatabaseServices.postPortfolio({
            username: this.username,
            portfolioItem: this.userData
          });
          this.$store.state.snackbarText = 'Your portfolio has been successfully created';
        } catch (error) {
          this.$store.state.snackbarText = 'There has been an issue making contact with our servers, your work has not been saved';
          console.error('Post request was unsuccessful!', error);
          return;
        }
      }
      
      this.$store.state.portfolioItem = undefined;
      localStorage.removeItem('unsavedSessionData');

      this.$router.push('/');
    }
  }
}
</script>