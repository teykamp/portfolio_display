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
import AuthMixin from './AuthMixin'
import { hashSync } from 'bcryptjs'
import axios from 'axios'

export default {
  mixins: [
    AuthMixin
  ],
  data() {
    return {
      rePassword: '',
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
      let usernameTaken;
      try {
        usernameTaken = await DatabaseServices.isUsernameTaken(this.username);
      } catch {
        this.catchStatement();
        return;
      }

      if (usernameTaken) {
        this.exitProcess(
          'Username Taken',
          'This username has already been taken, try something similar',
          'ok',
          false,
          () => { this.sendUserToRegisterForm() }
        );
        return;
      }

      // tells parent to transition away from register and to a loading state
      this.$parent.formSubmitted = true;
      
      // hashes password for security
      this.password = hashSync(this.password);

      // fetch client ip address
      let userIP;
      try {
        userIP = await axios.get('http://api.ipify.org/');
      } catch (error) {
        console.warn(error);
        userIP = '';
      }

      // post account and portfolio that links to the account
      try {

        await DatabaseServices.postAccount({
          username: this.username,
          password: this.password,
          userIP: userIP.data
        });

      } catch {
        this.catchStatement();
        return;
      }

      // check if name conflict exists
      let userIDsForUsername;
      try {
        userIDsForUsername = await DatabaseServices.getAllUsersWithUsername(this.username);
      } catch {
        this.catchStatement();
        return;
      }
      // if it does, it will delete all accounts with that username
      if (userIDsForUsername.length > 1) {
        userIDsForUsername.forEach(id => DatabaseServices.deleteAccountByID(id));
      }
      // message given to user if accounts were created at the same time
      if (userIDsForUsername.length != 1) {
        this.exitProcess(
          'What a coincidence!',
          `It seems like another person tried to register for the username ${this.username} at the same time as you. Because you both pressed create at the same time, no one has been given the account, meaning ${this.username} is still available, hurry up and try re-registering.`,
          'Try again (fast!!!)',
          false,
          () => { this.sendUserToRegisterForm() }
        );
        return;
      }

      await new Promise(resolve => setTimeout(() => resolve(), 1000));

      // wait 1 before preforming one final sanity check to make sure the account 
      // was created and is accessible
      try {
        const sanityCheck = await DatabaseServices.isUsernameTaken(this.username);
        if (!sanityCheck) {
          this.exitProcess(
            'What a coincidence!',
            `It seems like another person tried to register for the username ${this.username} at the same time as you. Because you both pressed create at the same time, no one has been given the account, meaning ${this.username} is still available, hurry up and try re-registering.`,
            'Try again (fast!!!)',
            false,
            () => { this.sendUserToRegisterForm() }
          );
          return;
        } else {
          // when the final sanity check passes and everything checks out,
          // a post is made to set up the basics of the users portfolio
          await DatabaseServices.postPortfolio({
            username: this.username,
            portfolioItem: { error: `${this.username} has not created a portfolio yet.` },
            // sets default privacy settings
            privacySettings: {
              visibility: true,
              accesskey: null
            }
          });
        }
      } catch {
        this.catchStatement();
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
      
    }
  }
}
</script>