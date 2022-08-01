<template>
  <div>
    <Toolbar 
      :title="$vuetify.breakpoint.smAndUp ? 'My Portfolio' : ''"
      :exitAction="() => showExitDialog = true"
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
          @click.stop="editMode ? updatePortfolioRemote() : createPortfolioRemote()"
        >
          {{ editMode ? 'Save' : 'Create' }}
        </v-btn>
      </template>
    </Toolbar>

    <!-- TEMPORARY -->
    <div class="mx-12" v-if="!loading">
      <v-text-field 
        label="Username of Portfolio (for lookup)"
        v-model="username"
      />
    </div>
    <!-- TEMPORARY -->

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
      // a temporary replacement until user auth is added
      username: '',
      // true when steps dialog is being displayed
      showStepsDialog: false,
      // true when exit dialog is being displayed
      showExitDialog: false,
      // tiggered if leave is prevented in exit dialog
      preventLeave: false
    }
  },
  props: {
    invalidComponents: {
      type: Array,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  components: {
    Steps,
    Toolbar,
    DialogBox
  },
  methods: {
    sendUserToPreview() {
      this.$store.state.portfolioItem = this.userData;
      this.$parent.saveSessionLocally();
      this.$router.push({ name: 'PortfolioDisplayPreview' });
    },
    leaveCreateRoute() {
      this.showExitDialog = false;
      if (this.preventLeave) return this.preventLeave = false;
      this.$parent.saveSessionLocally();
      this.$router.push('/');
    },
    updatePortfolioRemote() {
      DatabaseServices.updatePorfolio(this.username, this.userData);
      this.$store.state.portfolioItem = undefined;
      localStorage.removeItem('unsavedSessionData');
      this.$router.push('/');
    },
    createPortfolioRemote() {
      DatabaseServices.postPortfolio({
        username: this.username,
        portfolioItem: this.userData
      });
      this.$store.state.portfolioItem = undefined;
      localStorage.removeItem('unsavedSessionData');
      this.$router.push('/');
    }
  }
}
</script>