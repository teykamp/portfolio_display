<template>
  <v-card 
  :color="`${item.color} lighten-1`"                 
  >
    
    <v-row
    no-gutters
    align="center"
    justify="center">
      <v-col 
      v-show="removable" 
      :retain-focus="false" 
      cols="1" 
      class="ml-3" 
      @click.stop="$emit('remove')"
      >
        <v-row justify="center">                      
          <v-icon>                                                                         
            mdi-close-circle
          </v-icon>
        </v-row>         
      </v-col>
      <v-col>
        <v-card-title>{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
      </v-col>
      <v-col v-show="draggable" cols="1">
        <v-icon>
          mdi-drag-horizontal-variant
        </v-icon>
      </v-col>
      <v-col cols="1" @click.stop="$emit('edit')">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Edit {{ item.name }}</span>
        </v-tooltip>                
      </v-col>
    </v-row>
    
  </v-card>
</template>

<script>
export default {
  props: { 
    item: Object,
    draggable: {
      type: Boolean,
      required: false,
      default: true
    },
    removable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>