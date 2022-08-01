<template>
  <v-dialog 
    max-width="400" 
    v-model="show"
    persistent
  >
    <v-card class="pb-2">
      <v-card-title style="word-break: break-word" class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          :color="mainBtnColor"
          :dark="dark"                           
          @click.stop="confirmed()"
        >
          {{ mainBtnText }}
        </v-btn>
        <v-btn                            
          text
          @click.stop="show = false"
        >
          {{ secondaryBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    mainBtnColor: {
      type: String,
      required: false,
      default: 'error'
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    },
    mainBtnText: {
      type: String,
      required: false,
      default: 'confirm'
    },
    secondaryBtnText: {
      type: String,
      required: false,
      default: 'nevermind'
    }
  },
  methods: {
    confirmed() {
      this.$emit('confirmed');
      this.show = false;
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      }
    }
  }
}
</script>