export default {
  data() {
    return {
      // modeled after what the user inputs inside username field
      username: '',
      // modeled after what the user inputs inside password field
      password: '',
      // toggles password visibility
      showPassword: false
    }
  },
  methods: {
    catchStatement() {
      this.exitProcess(
        'There has been an issue with a request made to our servers',
        'This could be an issue with connectivity on your end, or a server problem on ours.',
        'Try one more time',
        false,
        () => { this.$parent.formType ? this.sendUserToRegisterForm() : this.sendUserToLoginForm() }
      );
    },
    exitProcess(title, desc, btnTxt, formValid, action) {
      this.$parent.showCompletionDialog = true;
      this.$parent.dialogContent = {
        title,
        desc,
        btnTxt,
        formValid,
        action
      };
    },
    sendUserToLoginForm() {
      this.$parent.formType = false;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    },
    sendUserToRegisterForm() {
      this.$parent.formType = true;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    }
  }
}