<template>
  <div>
    <v-container
      fill-height 
      fluid
      class="container"
    >
        <!-- User not defined -->
        <div v-if="errorType === 'no server conection'">
          <v-alert
          prominent
          type="error"
          icon="mdi-cloud-alert"
          >
            <div class="errorPadding">
              There has been an issue connecting with our servers, this may be an internet connectivity issue.
            </div>
          </v-alert>
        </div>

        <!-- User not found -->
        <div v-else-if="errorType === 'user not found'">
          <v-alert
            prominent
            type="error"
          >
            <v-row 
              align="center"
              justify="center"
            >
              <v-col class="grow">
                <div class="errorPadding">
                  <h5>Portfolio Not Found</h5>
                  Please search for another portfolio.
                </div>
              </v-col>
              <v-col class="shrink">
                <v-btn @click.stop="$router.push('/')">
                  Search Again
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>  
        </div>

        <!-- Private Account -->
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
              <v-col class="shrink">
                <v-btn @click.stop="$router.push('/')">
                  Home
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </div>

        <!-- Fallback -->
        <div v-else>
          <v-alert
          prominent
          type="error"
          icon="mdi-cloud-alert"
          >
            <div class="errorPadding">
              There has been an error loading this page.
            </div>
          </v-alert>
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

