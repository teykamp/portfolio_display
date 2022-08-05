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
    submit() {
      this.$emit('form-submission')
    }
  }
}
</script>

