<template>
  <v-card 
    :min-width="$vuetify.breakpoint.smAndUp ? '400px' : '90vw'" 
    class="pa-5 ma-4"
  >
    <v-row 
      align="center" 
      justify="center"
    >
      <v-card-title>
        Register
      </v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-text-field 
      label="Username"
      v-model="username"
      :rules="[rules.containsSpaces]"
    />
    <v-text-field 
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      v-model="password"
      :rules="[rules.passwordLength, rules.containsSpaces]"
    />
    <v-text-field 
      label="Confirm Password"
      :type="showPassword ? 'text' : 'password'"
      v-model="rePassword"
      :rules="[rules.matchingPasswords]"
    />
    <!-- <v-divider></v-divider> -->
    <!-- :disabled="validateInput"  -->
    <v-card-actions>
      <v-btn 
        @click.stop="submit()" 
        
        color="success"
      >
        Create
      </v-btn>
      <v-spacer></v-spacer>
       <v-btn @click.stop="$parent.formType = !$parent.formType" text color="info">
        Login Here
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import DatabaseServices from '../../DatabaseServices'

export default {
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      showPassword: false,
      rules: {
        matchingPasswords: value => (value === this.password) || 'Passwords do not match',
        passwordLength: value => (value.length > 5) || 'Password is to short',
        containsSpaces: value => !(/\s/.test(value)) || 'Cannot contain spaces'
      }
    }
  },
  methods: {
    validateInput() {
      if (!this.username) return true
      if (!this.password) return true
      if (/\s/.test(this.username + this.password)) return true
      if (this.password.length <= 5) return true
      if (this.password !== this.rePassword) return true
    },
    async submit() {

      // make get request to see if username is taken
      // if not takes do this
      const usernameTaken = false;
      if (usernameTaken) {
        this.exitProcess(
          'Username Taken',
          'This username has already been taken, try registering with a different name and resubmitting',
          'Retry',
          false,
          () => { this.resubmitRegisterForm() }
        );

        return;
      }

      // tells parent to transition away from register and to a loading state
      this.$parent.formSubmitted = true;

      // simulates time that it would take to post to db and do 
      // final check to see if there are no naming conflicts
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // make post request

      // check if name conflict exists

      // if it does then delete the account
      const usernameTakenAgain = false;
      if (usernameTakenAgain) {
        this.exitProcess(
          'There seems to have been an issue :(',
          'Unfortunately an issue was encountered whilst in the process of creating your account, please try again.',
          'Try again',
          false,
          () => { this.resubmitRegisterForm() }
        );
      }

      // if everything checks out and we can confirm our changes to the db, we send this exit msg
      this.exitProcess(
        'Hooray!',
        'Your account has been successfully created, to complete the account creation process and begin building, we must ask you to log in with your newly created credentials.',
        'login',
        true,
        () => { this.sendUserToLoginForm() }
      );
      
    },
    exitProcess(title, desc, btnTxt, formValid, action) {
      this.$parent.dialogContent = {
        title,
        desc,
        btnTxt,
        formValid,
        action
      };

      this.$parent.showCompletionDialog = true;
    },
    resubmitRegisterForm() {
      this.$parent.formType = true;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    },
    sendUserToLoginForm() {
      this.$parent.formType = false;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    }
  }
}
</script>