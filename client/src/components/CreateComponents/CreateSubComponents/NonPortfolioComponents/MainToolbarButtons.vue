<template>
<div>
  <v-btn 
    :disabled="invalidComponents.length != 0" 
    :loading="loading"
    :dark="invalidComponents.length == 0"
    :color="saveBtnColor" 
    @click.stop="actions[0]"
    :style="styles"
    :class="classes"
  >
    <v-icon class="mr-2">{{ saveBtnIcon }}</v-icon>
    {{ saveBtnText }}
  </v-btn>

  <v-btn 
    :disabled="invalidComponents.length != 0" 
    color="primary" 
    :loading="loading"
    @click.stop="actions[1]"
    :style="styles"
    :class="classes"
  >
    <v-icon class="mr-2">mdi-file-eye-outline</v-icon>
    Preview
  </v-btn>

  <v-btn
    color="cyan darken-1"
    dark
    :loading="loading"
    @click.stop="actions[2]"
    :style="styles"
    :class="classes"
  >
    <v-icon>mdi-help-circle-outline</v-icon>
    <span class="ml-2">Help</span>
  </v-btn>

  <v-btn 
    color="gray" 
    text
    :loading="loading"
    @click.stop="actions[3]"
    :style="styles"
    :class="classes"
  >
    <v-icon class="mr-2">mdi-cog-outline</v-icon>
    Privacy Settings
  </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: String,
      required: false,
      default: ''
    },
    classes: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: true
    },
    invalidComponents: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      required: true
    },
    saveState: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    saveBtnColor() {
      return this.saveState ? 'green' : 'orange darken-2';
    },
    saveBtnIcon() {
      return this.saveState ? 'mdi-cloud-check-outline' : 'mdi-cloud-upload-outline';
    },
    saveBtnText() {
      return this.saveState ? 'saved' : 'save';
    }
  }
}
</script>
