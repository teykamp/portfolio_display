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
          @click.stop="sendUserToPreview()"
        >
          <v-icon class="mr-2">mdi-file-eye-outline</v-icon>
          Preview
        </v-btn>
        <Steps />
        <v-btn 
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
    <div class="mx-12">
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
      username: ''
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
    }
  },
  components: {
    Steps,
    Toolbar
  }
}
</script>