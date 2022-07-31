<template>
  <div>
    <Toolbar 
      :title="$vuetify.breakpoint.smAndUp ? 'My Portfolio' : ''"
      :exitAction="() => $router.push('/')"
    >
      <template #actions>
        <v-btn 
          :disabled="invalidComponents.length > 0" 
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
          :loading="loading"
          dark 
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

  </div>
</template>

<script>
import Steps from './StepByStep.vue'
import Toolbar from '../../../ReusableComponents/CreateToolbar.vue'

export default {
  data() {
    return {
      // a temporary replacement until user auth is added
      username: '',
      // true when steps dialog is being displayed
      showStepsDialog: false
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
    }
  },
  components: {
    Steps,
    Toolbar
  }
}
</script>