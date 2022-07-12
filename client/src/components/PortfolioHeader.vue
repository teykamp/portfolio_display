<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="8"
        >
          <v-sheet
            class="textBox"
            outlined
            rounded
          > 
            <v-container>
              <div>
                <h1>Hi!</h1>
                <h2>I'm {{ data.name }},</h2>
                <h4>{{ data.professionalTitle }}</h4>
              </div>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col
          cols="6"
          md="4"
        >
          <v-img
              max-height="400"
              max-width="400"
              :src="data.headshotURL"
              transition="fade-transition"
              
            >
            </v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: [
    'data'
  ]
}
</script>

<style scoped>
  .outerBox {
    margin: 2%;
  }
  h1 {
    padding-top: 5%
  }
  .textBox {
    height: 100%;
    width: 100%;
  }
</style>