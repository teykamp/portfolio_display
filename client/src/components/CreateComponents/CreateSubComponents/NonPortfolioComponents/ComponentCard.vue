<template>
  <v-card 
    color="blue lighten-3"
    @click.stop="editOnMobile" 
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
            <span>Remove {{ item }}</span>
          </v-tooltip>     
        </v-row>         
      </v-col>

      <!-- Title Text -->
      <v-col>
        <v-card-title style="font-size: 12pt">
          {{ `${item[0].toUpperCase()}${item.substring(1)}` }}
        </v-card-title>
      </v-col>

      <!-- Missing Info -->
      <v-col v-show="invalid" cols="1" :class="$vuetify.breakpoint.smAndUp ? '' : 'mr-2'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-alert
            </v-icon>
          </template>
          <span>{{ item }} is missing critical information</span>
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

      <!-- Editable -->
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
              {{ 'mdi-pencil' }}
            </v-icon>
          </template>
          <span>{{ `Edit ${item}` }}</span>
        </v-tooltip>                
      </v-col>
    </v-row>
    
  </v-card>
</template>

<script>
export default {
  props: { 
    item: String,
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
    invalid: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    editOnMobile() {
      if (!this.$vuetify.breakpoint.mdAndUp) this.$emit('edit')
    }
  }
}
</script>