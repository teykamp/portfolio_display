<template>
  <div>
    <v-container
      fill-height fluid
      class="container">
        <div v-if="errorType === 'no server conection'">
          <h1>There has been an issue connecting with our servers, this may be an internet connectivity issue.</h1>
        </div>

        <div v-else-if="errorType === 'user not found'">
          <v-alert
          prominent
          type="error"
          >
            <v-row 
              align="center"
              justify="center">
              <v-col class="grow">
                <div class="errorPadding">
                  <h5>User Not Found</h5>
                  Please search for another user.
                </div>
              </v-col>
              <v-col class="shrink">
                <!-- SEARCH AGAIN BUTTON -->
                <v-btn href="/">Search Again</v-btn>
              </v-col>
            </v-row>
          </v-alert>  
        </div>

        <div v-else-if="errorType === 'account set private'">
          <v-alert
            prominent
            type="warning"
          >
            <v-row align="center">
              <v-col class="grow">
                <div class="errorPadding">
                  This portfolio has been marked as private, contact {{ username }} to gain access!
                </div>
              </v-col>
            </v-row>
          </v-alert>
        </div>

        <!-- fallback -->
        <div v-else>
          <h1>There has been an error loading the page.</h1>
        </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: [
    'errorType',
    'username',
  ],
  created() {

  },
  data: () => {
    return {
      errorMsg: ''
    }
  }
}
</script>

<style>
.errorPadding {
  padding-left: 20px;
}
.container {
  display: flex;
  justify-content: center;
}

</style>

