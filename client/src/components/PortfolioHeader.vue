<template>
  <div>
    <v-sheet 
      width="100%" 
      tile 
      class="position-absolute" 
      color="secondary" 
      height="600"
    >
    </v-sheet>
    <v-container class="pt-16">
      <v-col xs="12" sm="12" md="10">
        <v-card 
          min-height="600" 
          class="mt-16"
        >
          <v-container 
            fluid 
            fill-height
          >
            <v-row>  
              <v-col>
                <div class="pt-16 pl-16">
                  <v-card-subtitle class="text-h5 pb-0"> Hi! I'm </v-card-subtitle>
                  <v-card-subtitle class="text-h3"> {{ data.name }}, </v-card-subtitle>
                  <v-card-subtitle class="text-h6"> {{ data.professionalTitle }} </v-card-subtitle>
                </div>
                <v-container>
                  <v-card 
                    tile 
                    flat 
                    class="pl-10"
                  >
                    <v-list-item>
                      <v-list-item-content v-if="data.email">
                        <v-list-item-title>
                          <v-btn
                            target="_blank" 
                            small 
                            plain
                            :href="'mailto:' + data.email"
                          >
                            <v-icon>mdi-email</v-icon>
                            {{ data.email }}
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content v-if="data.phone">
                          <v-list-item-title>
                            <v-btn plain>
                              <v-icon>mdi-phone</v-icon>
                              {{ data.phone }}
                            </v-btn>
                          </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-spacer></v-spacer>
                </v-container>
                <v-container>
                  <v-row justify="center">
                    <v-btn
                      v-for="link in data.links"
                      :key=link.id
                      class="ma-2"
                      color="accent"
                      dark
                      :href="link.URL"
                      target="_blank"
                    >
                      <v-icon v-if="link.type === 'personal'">mdi-web</v-icon>
                      <v-icon 
                        v-else 
                        dark
                      >
                        mdi-{{ link.type }}
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-container>
              </v-col>
              <v-col>
                <v-sheet 
                  min-width="400" 
                  class="pt-10"
                >
                  <v-img 
                    :src="data.headshotURL"
                    max-height="500"
                    contain
                    aspect-ratio="1"
                  ></v-img>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
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
