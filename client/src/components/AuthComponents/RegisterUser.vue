<template>
  <div>
    <v-text-field 
      label="Username"
      v-model="username"
    />
    <v-text-field 
      label="Password"
      v-model="password"
      :rules="[rules.passwordLength]"
    />
    <v-text-field 
      label="Confirm Password"
      :rules="[rules.matchingPasswords]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        matchingPasswords: value => (value === this.password) || 'Passwords do not match',
        passwordLength: value => (value.length > 6) || 'Password is to short'
      }
    }
  }
}
</script>