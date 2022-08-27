<template>
  <div>
    <div class="container">
      <v-container
        fill-height 
        fluid  
      >
        <v-row class="row">
          <v-sheet>
            <div class="text404">
              404
            </div>
          </v-sheet>
        </v-row>
        <v-row
          class="row"
        >
          <v-alert
            prominent
            type="error"
            icon="mdi-cloud-alert"
          >
            <v-row
              align="center"
              no-gutters
            >
              <v-col class="grow">
                <div class="errorPadding">
                  Sorry, this page could not be found.
                </div>
              </v-col>
              <v-col class="shrink">  
                <v-btn
                color="white"
                outlined
                href="/"
                >
                Home
              </v-btn>
            </v-col>
           </v-row>
          </v-alert>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: '404Error',
  created() {
    // to prevent mobile devices being auto routed to 404 through manifest
    if (!this.$vuetify.breakpoint.mdAndUp) {
      this.$router.push('/');
    }
  }
}
</script>

<style>
.text404 {
  font-size: 234px;
  font-weight: bold;
}
.errorPadding {
  padding-left: 20px;
  padding-right: 20px;
}
.row {
  display: flex;
  justify-content: center;
}
</style>