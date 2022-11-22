<template>
  <v-card
    :min-width="$vuetify.breakpoint.smAndUp ? '400px' : '80vw'" 
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
      v-model="username"
      label="Username"
      prepend-icon="mdi-account-circle"
    />
    <v-text-field 
      v-model="password"
      @click:append="showPassword = !showPassword"
      :type="passwordType"
      :append-icon="eyeIcon"
      label="Password"
      prepend-icon="mdi-lock"
    />
    <!-- <v-divider></v-divider> -->
    <v-card-actions>
      <v-btn 
        @click.stop="submit" 
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
import AuthMixin from './AuthMixin'
 
export default {
  mixins: [ 
    AuthMixin
  ],
  methods: {
    async submit() {
      this.attemptLogin().then(() => {
        this.exitProcess(
          'Login Successful',
          `You have successfully logged in as ${localStorage.getItem('username')}`,
          'work on portfolio',
          true,
          () => { this.$router.push({
            name: 'Build'
          }) }
        )
      })
    }
  }
}
</script>

