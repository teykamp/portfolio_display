<template>
  <div>

    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">

      <v-icon @click.stop="exitAction">mdi-chevron-left</v-icon>

      <v-toolbar-title
        style="font-weight: bold;" 
        class="ml-1"
      >{{ title }}</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <slot name="actions">
        <v-btn 
          v-if="!disableAddBtn" 
          @click="onAdd"
          :color="addBtnColor" 
          :dark="addBtnColor === 'red'" 
          :disabled="listLength === disabledAt"
        >
          <v-icon>mdi-plus</v-icon>

          <span class="d-none d-sm-flex">Add {{ title }} ({{ listLength }}/{{ disabledAt }})</span>

        </v-btn>
        
      </slot>

    </v-toolbar>

    <!-- v-toolbar is 56px high on xs-sm and 64px high on md-xl, 
    this div adds 15px net margin between toolbar and elements position below -->
    <div :style="`width: 100vw; height: ${$vuetify.breakpoint.mdAndUp ? '79' : '71' }px;`"></div>
    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    exitAction: {
      type: Function,
      required: true
    },
    disableAddBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    onAdd: {
      type: Function,
      required: false,
      default: () => { throw new Error('Button Action Was Left Unassigned By Parent!') }
    },
    addBtnColor: {
      type: String,
      required: false,
      default: 'success'
    },
    listLength: {
      type: Number,
      required: false
    },
    disabledAt: {
      type: Number,
      required: false,
      validator: passedValue => passedValue > 0
    },
  }
}
</script>