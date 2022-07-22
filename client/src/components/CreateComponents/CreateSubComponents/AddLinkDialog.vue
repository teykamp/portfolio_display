<template>
  <v-dialog
  persistant
  max-width="500px"
  v-model="show"
  >
    <v-card>
      <v-card-title>Add Link</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field 
              label="URL"
              v-model="url"
              required
              ></v-text-field>
              <v-autocomplete
              label="Link Type"
              :items="linkTypes"
              v-model="linkTypeSelected"
              required
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn 
        color="primary"
        @click.stop="confirmed()"
        :disabled="validateInput"
        >
          Save
        </v-btn>
        <v-btn
        @click.stop="show = false"
        text
        >
          Exit
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      url: '',
      linkTypeSelected: '',
      linkTypes: [
        'Github',
        'Instagram',
        'Facebook',
        'YouTube',
        'LinkedIn',
        'Personal Site'
      ]
    }
  },
  methods: {
    confirmed() {

      this.$emit('confirmed', { 
        URL: this.url, 
        type: this.linkTypeSelected.toLowerCase()
      });

      this.show = false;
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.$emit('close')
      }
    },
    validateInput: {
      get() {
        return !(this.url && this.linkTypeSelected)
      }
    }
  },
  watch: {
    url() {

    }
  }
}
</script>