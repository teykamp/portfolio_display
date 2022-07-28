<template>
  <v-card 
  :color="`${item.color} lighten-1`"  
  @click.stop="onClick"               
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-close-circle
              </v-icon>
            </template>
            <span>Remove {{ item.name }}</span>
          </v-tooltip>     
        </v-row>         
      </v-col>

      <!-- Title Text -->
      <v-col>
        <v-card-title>{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}</v-card-title>
      </v-col>

      <!-- Missing Info -->
      <v-col v-show="invalid && editable" cols="1" :class="$vuetify.breakpoint.smAndUp ? '' : 'mr-2'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-alert
            </v-icon>
          </template>
          <span>This component is missing critical information</span>
        </v-tooltip>     
      </v-col>

      <!-- Draggable -->
      <v-col v-show="draggable" cols="1" :class="$vuetify.breakpoint.smAndUp ? '' : 'mr-2'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-drag-horizontal-variant
            </v-icon>
          </template>
          <span>This component is draggable</span>
        </v-tooltip>     
      </v-col>

      <!-- Editable / Help -->
      <v-col cols="1" v-if="$vuetify.breakpoint.smAndUp">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              {{ editable ? 'mdi-pencil' : 'mdi-help-circle' }}
            </v-icon>
          </template>
          <span>{{ editable ? `This component is editable` : `${item.desc}` }}</span>
        </v-tooltip>                
      </v-col>
      <div v-else-if="!editable" class="mx-3 mb-2">{{ item.desc  }}</div>
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
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    },
    invalid: {
      type: Boolean,
      required: false,
      default: false
    },
    onClick: {
      type: Function,
      required: false,
      default: () => { console.log('CardComponent: Card Not Clickable') }
    }
  }
}
</script>