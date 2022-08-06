<template>
  <v-card 
    :min-width="$vuetify.breakpoint.smAndUp ? '400px' : '90vw'" 
    class="pa-5 ma-4"
  >
    <v-row align="center" justify="center">
      <v-card-title>
        Login
      </v-card-title>
    </v-row>
    <v-divider></v-divider>
    <v-text-field 
      label="Username"
      v-model="username"
    />
    <v-text-field 
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      v-model="password"
    />
    <!-- <v-divider></v-divider> -->
    <v-card-actions>
      <v-btn @click.stop="submit()" :disabled="!username || !password" color="success">
        Login
      </v-btn>
      <v-spacer></v-spacer>
       <v-btn @click.stop="$parent.formType = !$parent.formType" text color="info">
        Register Here
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    async submit() {

      this.$parent.formSubmitted = true;
      await new Promise(resolve => setTimeout(resolve, 1500));

      // send get req for user

      // if user is not found
      const user = false;
      if (user) {
        this.exitProcess(
          'Incorrect Username or Password',
          'The username or password that was entered do not match our records',
          'Try again',
          false,
          () => { this.sendUserToLoginForm() }
        );

        return;
      }

      // if password is incorrect
      const passwordCorrect = true;
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
      this.exitProcess(
        'Login Successful',
        `You have successfully logged in as ${this.username}!`,
        'jump to user panel',
        true,
        () => { this.$router.push('/create') }
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
    sendUserToLoginForm() {
      this.$parent.formType = false;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    }
  }
}
</script>

