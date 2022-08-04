<template>
  <v-card class="pa-5 ma-4" max-width="800px">
    <v-row align="center" justify="center">
      <v-card-title>
        Register Account
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
    <v-card-actions>
      <v-btn @click.stop="submit()" :disabled="validateInput()" color="success">
        Create
      </v-btn>
      <v-spacer></v-spacer>
       <v-btn @click.stop="$parent.formType = !$parent.formType" text color="info">
        Have an account? Login
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

      this.$parent.formSubmitted = true;
      // make get request to see if username is taken

      await new Promise(resolve => setTimeout(resolve, 1500))

      this.exitProcess(
        'Username Taken',
        'This username has already been taken, try registering with a different name and resubmitting',
        'Retry',
        true,
        () => { this.resubmitRegisterForm() }
      )
      
      
      // make post request

      // run in 2.5 seconds to see if user was successfully posted to db
      
    },
    exitProcess(title, desc, btnTxt, formValid, action) {
      this.$parent.showCompletionDialog = true;
      this.$parent.dialogContent = {
        title,
        desc,
        btnTxt,
        formValid,
        action
      }
    },
    resubmitRegisterForm() {
      this.$parent.formType = true;
      this.$parent.formSubmitted = false;
      this.$parent.showCompletionDialog = false;
    }
  }
}
</script>