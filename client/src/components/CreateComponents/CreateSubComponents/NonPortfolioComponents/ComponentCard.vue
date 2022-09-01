<template>
  <v-card 
    :color="item.color" 
    @click.once="onClick" 
  >
    <v-row
      no-gutters
      align="center"
      justify="center"
    >
      <v-col 
        v-if="removable" 
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

      <v-col 
        v-else-if="item.name != 'header'"
        :retain-focus="false" 
        cols="1" 
        class="ml-3"
        @click.stop="$emit('add')"
      >
        <v-row justify="center">                      
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-plus
              </v-icon>
            </template>
            <span>Click to add the {{ item.name }} component</span>
          </v-tooltip>     
        </v-row>         
      </v-col>

      <!-- Title Text -->
      <v-col>
        <v-card-title
        :style="editable || $vuetify.breakpoint.smAndUp ? '' : 'font-size: 12pt' "
        >{{ `${item.name[0].toUpperCase()}${item.name.substring(1)}` }}
        </v-card-title>
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
          <span>{{ item.name }} is missing critical information</span>
        </v-tooltip>     
      </v-col>

      <!-- Draggable -->
      <v-col 
        v-if="draggable" 
        cols="1" 
        :class="$vuetify.breakpoint.smAndUp ? '' : 'mr-2'"
        @mouseover="$emit('update-drag', true)"
        @mouseleave="$emit('update-drag', false)"
      >
        <v-icon>
          mdi-drag-horizontal-variant
        </v-icon>
      </v-col>

      <!-- Editable / Help -->
      <v-col 
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="1"
        @click.stop="$emit('edit')"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              {{ editable ? 'mdi-pencil' : 'mdi-help-circle' }}
            </v-icon>
          </template>
          <span>{{ editable ? `Edit ${item.name}` : `${item.desc}` }}</span>
        </v-tooltip>                
      </v-col>
      <v-col 
        v-else-if="!editable" 
        :style="$vuetify.breakpoint.smAndUp ? '' : 'font-size: 9pt'"
        :class="$vuetify.breakpoint.smAndUp ? 'mr-6 mt-4': 'mr-3 mt-5'">
        <p>{{ item.desc }}</p>
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