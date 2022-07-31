<template>
  <v-dialog 
    max-width="400" 
    v-model="show"
    persistent
  >
    <v-card class="pb-2">
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"                              
          @click.stop="confirmed()"
        >
          Confirm
        </v-btn>
        <v-btn                            
          text
          @click.stop="show = false"
        >
          Nevermind
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['visible', 'title', 'description'],
  methods: {
    confirmed() {
      this.$emit('confirmed');
      this.show = false;
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>