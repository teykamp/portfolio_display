import DatabaseServices from '../../DatabaseServices'

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
  computed: {
    eyeIcon() {
      return this.showPassword ? 'mdi-eye' : 'mdi-eye-off';
    },
    passwordType() {
      return this.showPassword ? 'text' : 'password';
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
    },
    async attemptLogin() {
      this.$parent.formSubmitted = true;

      const loginAttempt = {
        username: this.username,
        password: this.password
      };

      let authStatus;
      try {
        authStatus = await DatabaseServices.authorizeLogin(loginAttempt);
      } catch {
        throw this.exitProcess(
          'There has been an issue with a request made to our servers',
          'This could be an issue with connectivity on your end, or a server problem on ours.',
          'Try one more time',
          false,
          () => { this.sendUserToLoginForm() }
        );
      }

      if (!authStatus.isAuthorized) {
        throw this.exitProcess(
          'Incorrect Username or Password',
          'The username or password that was entered do not match our records',
          'Try again',
          false,
          () => { this.sendUserToLoginForm() }
        );
      }
      
      // if everything is successful
      localStorage.setItem('username', this.username);
      localStorage.setItem('sessionToken', authStatus.authToken);   
    }
  }
}