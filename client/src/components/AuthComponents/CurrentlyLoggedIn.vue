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
        You Are Already Logged In!
      </v-card-title>
    </v-row>
    <v-divider></v-divider>
    <div class="center">
      <div>You're currently logged in as</div>
      <div><b>{{ username }}</b></div>
      <div>To login/register with another account, you must first logout.</div>
    </div>
    <v-card-actions class="mt-5">
      <v-btn 
        @click.stop="logout()" 
        color="error"
        block
      >
        Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.username
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      setTimeout(() => location.reload(), 25);
    }
  }
}
</script>

<style scoped>
div {
  font-size: 13pt;
}
</style>