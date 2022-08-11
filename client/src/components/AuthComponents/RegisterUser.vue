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
      prepend-icon="mdi-account-circle"
      :rules="[rules.containsSpaces]"
    />
    <v-text-field 
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      prepend-icon="mdi-lock"
      @click:append="showPassword = !showPassword"
      v-model="password"
      :rules="[rules.passwordLength, rules.containsSpaces]"
    />
    <v-text-field 
      label="Confirm Password"
      :type="showPassword ? 'text' : 'password'"
      prepend-icon="mdi-redo-variant"
      v-model="rePassword"
      :rules="[rules.matchingPasswords]"
    />

    <!-- <v-divider></v-divider> -->
    <v-card-actions>
      <v-btn 
        @click.stop="submit()" 
        :disabled="validateInput"
        color="success"
      >
        Create
      </v-btn>
      <v-spacer></v-spacer>
       <v-btn 
        @click.stop="$parent.formType = !$parent.formType" 
        text
        color="info"
      >
        Login Here
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DatabaseServices from '../../DatabaseServices'
import { hashSync } from 'bcryptjs'

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
  computed: {
    validateInput() {
      if (!this.username) return true
      if (!this.password) return true
      if (/\s/.test(this.username + this.password)) return true
      if (this.password.length <= 5) return true
      if (this.password !== this.rePassword) return true

      return false
    }
  },
  methods: {
    async submit() {

      // make get request to see if username is taken
      const usernameTaken = await DatabaseServices.isUsernameTaken(this.username);

      if (usernameTaken) {
        this.exitProcess(
          'Username Taken',
          'This username has already been taken, try something similar',
          'ok',
          false,
          () => { this.resubmitRegisterForm() }
        );

        return;
      }

      // tells parent to transition away from register and to a loading state
      this.$parent.formSubmitted = true;
      
      // hashes password for security
      this.password = hashSync(this.password);

      // make post request
      DatabaseServices.postAccount({
        username: this.username,
        password: this.password
      });

      // will await the actual post when i figure out how
      // the flip to add an async promise to axios post/put!
      await new Promise(resolve => setTimeout(resolve, 3000));

      // check if name conflict exists
      // if it does, it will delete all accounts with username to prevent naming conflicts
      const userIDsForUsername = await DatabaseServices.getAllUsersWithUsername(this.username);

      if (userIDsForUsername.length > 1) {

        userIDsForUsername.forEach(id => DatabaseServices.deleteAccountByID(id));

        this.exitProcess(
          'There seems to have been an issue :(',
          'Unfortunately an issue was encountered whilst in the process of creating your account, please try again.',
          'Try again',
          false,
          () => { this.resubmitRegisterForm() }
        );

        return;

      // for the edge case were db connection was lost or obstructed and account creation didn't post
      } else if (userIDsForUsername.length === 0) {

        this.exitProcess(
          'There was an issue connecting with our servers :(',
          `Unfortunately the connection to our servers failed. This means that either 
          our servers are down (highly unlikely) or you are broke and cannot afford good 
          internet (judging by your geo location address highly likely), please try again.`,
          'Try again',
          false,
          () => { this.resubmitRegisterForm() }
        );

        return;
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