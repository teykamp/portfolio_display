<template>
  <v-card class="pa-5 ma-4" max-width="800px">
    <v-row align="center" justify="center">
      <v-card-title>
        Sign In
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
      <v-btn :disabled="!(password && username)" color="info">
        Login
      </v-btn>
      <v-btn @click.stop="$parent.formType = !$parent.formType" text color="info">
        Don't have an account? Register
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
  }
}
</script>

