<template>
  <div>

    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
      <v-icon @click.stop="exitAction">mdi-chevron-left</v-icon>
      <span style="font-weight: bold; font-size: 15pt;" class="ml-1">{{ title }}</span>
      
      <v-spacer></v-spacer>

      <slot name="actions">
        <v-btn v-show="!disableAddBtn" 
        :color="addBtnColor" 
        :dark="addBtnColor === 'red'" 
        @click="onAdd" 
        :disabled="listLength === disabledAt">
          <v-icon>mdi-plus</v-icon>
          <span class="d-none d-sm-flex">Add {{ title }} ({{ listLength }}/{{ disabledAt }})</span>
        </v-btn>
      </slot>

    </v-toolbar>

    <div style="width: 100vw; height: 10vh;"></div>
    
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
      validator: (passedValue) => passedValue > 0
    },
  }
}
</script>