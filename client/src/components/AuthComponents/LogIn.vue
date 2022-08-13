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
        Login
      </v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-text-field 
      label="Username"
      v-model="username"
      prepend-icon="mdi-account-circle"
    />
    <v-text-field 
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      prepend-icon="mdi-lock"
      @click:append="showPassword = !showPassword"
      v-model="password"
    />
    <!-- <v-divider></v-divider> -->
    <v-card-actions>
      <v-btn 
        @click.stop="submit()" 
        :disabled="!username || !password" 
        color="success"
      >
        Login
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        @click.stop="$parent.formType = !$parent.formType" 
        text 
        color="info"
      >
        Register Here
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DatabaseServices from '../../DatabaseServices'
import AuthMixin from './AuthMixin'
import { compareSync } from 'bcryptjs'
 
export default {
  mixins: [ 
    AuthMixin
  ],
  methods: {
    async submit() {

      this.$parent.formSubmitted = true;

      let user;
      try {
        user = await DatabaseServices.getAccountByUsername(this.username);
      } catch {
        this.exitProcess(
          'There has been an issue with a request made to our servers',
          'This could be an issue with connectivity on your end, or a server problem on ours.',
          'Try one more time',
          false,
          () => { this.sendUserToLoginForm() }
        );

        return;
      }

      // if user is not found
      if (!user) {
        this.exitProcess(
          'Incorrect Username or Password',
          'The username or password that was entered do not match our records',
          'Try again',
          false,
          () => { this.sendUserToLoginForm() }
        );

        return;
      }

      // if password is correct by comparing what is on the db with the hashed password
      const passwordCorrect = compareSync(this.password, user.password);

      if (!passwordCorrect) {
        this.exitProcess(
          'Incorrect Username or Password',
          'The username or password that was entered do not match our records',
          'Try again',
          false,
          () => { this.sendUserToLoginForm() }
        );

        return;
      }
      
      // if everything is successful
      localStorage.setItem('username', this.username);

      this.exitProcess(
        'Login Successful',
        `You have successfully logged in as ${this.username}!`,
        'work on portfolio',
        true,
        () => { this.$router.push({ name: 'Build' }) }
      );   
    }
  }
}
</script>

