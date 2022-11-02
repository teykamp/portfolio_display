<template>
  <div>
    <v-container
      fill-height 
      fluid
      class="container"
    >
      <!-- User not found -->
      <div v-if="error">
        <v-alert
          prominent
          :type="error.displayType"
        >
          <v-row 
            align="center"
            justify="center"
          >
            <v-col class="grow">
              <div class="errorPadding">
                <h5>{{ error.title }}</h5>
                {{ error.desc }}
                <br>
                <v-btn 
                  @click.stop="btnAction"
                  class="mt-5 black--text"
                  color="white"
                >
                  Search Again
                </v-btn>
              </div>
            </v-col>
          </v-row>
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
    this.error = this.errorData.find(error => error.errorType === this.errorType) ?? {
      title: 'Error Encountered',
      desc: 'An error was encountered whilst loading portfolio.',
      displayType: 'warning'
    };
    document.title = this.error.title;
  },
  data: () => {
    return {
      error: null,
      errorData: [{
        errorType: 'user not found',
        title: 'Portfolio Not Found',
        desc: 'Please search for another portfolio.',
        displayType: 'error'
      }, {
        errorType: 'no server connection',
        title: 'No Connection',
        desc: 'There has been an issue connecting to our servers. This may be an internet connectivity issue.',
        displayType: 'error'
      },
      {
        errorType: 'account set private',
        title: 'Access Restricted',
        desc: `This portfolio has been marked as private!`,
        displayType: 'info'
      }]
      // 
    }
  },
  methods: {
    btnAction() {
      this.$router.push({
        name: 'Home',
        query: {
          to: 'explore'
        }
      })
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