<template>
  <div>

    <!-- User input forms -->
    <div class="center">
      <transition name="slide">
        <component 
          v-if="!formSubmitted && !username" 
          style="position: absolute; top: 5%" 
          :is="formType ? 'register' : 'login'" 
        />
        <LoggedIn 
          v-else-if="!formSubmitted"
          style="position: absolute; top: 5%" 
        />
      </transition>
      <v-btn
        v-if="!formSubmitted"
        style="position: absolute; top: 1%"
        color="error"
        rounded
        @click.stop="$router.push('/')"
      >home</v-btn>
    </div>
   
    <!-- Loading Overlay -->
    <v-overlay :value="loadingOverlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <!-- Displayed to user on completion -->
    <DialogBox
      :title="dialogContent.title"
      :description="dialogContent.desc"
      :visible="showCompletionDialog"
    >
      <template #actions>
        <v-btn 
          :color="dialogContent.formValid ? 'success' : 'error'" 
          @click.stop="dialogContent.action"
        >{{ dialogContent.btnTxt }}</v-btn>
      </template>
    </DialogBox>

  </div>
</template>

<script>
import LoggedIn from '../components/AuthComponents/CurrentlyLoggedIn.vue'
import register from '../components/AuthComponents/RegisterUser.vue'
import login from '../components/AuthComponents/LogIn.vue'
import DialogBox from '../components/ReusableComponents/DialogBox.vue'

export default {
  components: {
    register,
    login,
    DialogBox,
    LoggedIn
  },
  data() {
    return {
      // gets username from localStorage to see if already logged in
      username: localStorage.getItem('username'),
      // true for register, false for login
      formType: true,
      // true when user hits create/login button
      formSubmitted: false,
      // true when component has finished processing a 
      // user request and is ready to show user their next steps using a dialog box
      showCompletionDialog: false,
      // an object containing all necessary information that must be fed into dialog component
      dialogContent: {
        title: '',
        desc: '',
        btnTxt: '',
        formValid: false,
        action: () => { throw new Error('Action Left Undefined') }
      }
    }
  },
  created() {
    this.formType = this.$route.query.type === 'register';
  },
  computed: {
    loadingOverlay() {
      return this.formSubmitted && !this.showCompletionDialog;
    }
  },
  methods: {
    callDialog(dialogContent) {
      this.dialogContent = dialogContent;
      this.showCompletionDialog = true;
    }
  },
  watch: {
    formType(newValue) {
      this.$router.replace({ name: 'Auth', query: { type: newValue ? 'register' : 'login' } });
    }
  }
}
</script>

<style scoped>
.slide-enter {
  transform: translateX(100vw);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transition: all 300ms;
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100vw);
}
.slide-leave-active {
  transition: all 300ms;
}
</style>