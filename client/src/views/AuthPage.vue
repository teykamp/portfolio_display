<template>
  <div class="center">

    <!-- User input forms -->
    <transition name="slide">
      <component 
        v-if="!formSubmitted"
        :is="formType ? 'register' : 'login'" 
      />
    </transition>

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
import register from '../components/AuthComponents/RegisterUser.vue'
import login from '../components/AuthComponents/LogIn.vue'
import DialogBox from '../components/ReusableComponents/DialogBox.vue'

export default {
  components: {
    register,
    login,
    DialogBox
  },
  data() {
    return {
      formType: true,
      formSubmitted: false,
      showCompletionDialog: false,
      loadingOverlay: false,
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
  watch: {
    formSubmitted() {
      this.loadingOverlay = (this.formSubmitted && !this.showCompletionDialog);
    },
    showCompletionDialog() {
      this.loadingOverlay = (this.formSubmitted && !this.showCompletionDialog);
    }
  },
  methods: {
    callDialog(dialogContent) {
      console.log('content')
      this.dialogContent = dialogContent;
      this.showCompletionDialog = true;
    }
  }
}
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(100vw);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transition: all 500ms;
}
.slide-leave-from {
  transform: translateX(0)
}
.slide-leave-to {
  transform: translateX(-100vw)
}
.slide-leave-active {
  transition: all 500ms;
}
</style>