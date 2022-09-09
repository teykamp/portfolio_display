<template>
  <v-card>
    <div class="pa-4">
      <v-row>
        <div
          v-if="missingInfo" 
          cols="1" 
          class="mt-7 ml-4"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"                 
              >
                mdi-alert
              </v-icon>
            </template>
            <span>{{ missingInfoText }}</span>
          </v-tooltip>     
        </div>
        <v-col cols="8">
          <v-text-field 
            v-model="titleModel" 
            :placeholder="placeholder"
            style="font-weight: bold; font-size: 18pt;"
            outlined
            clearable
            color="blue"                
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col 
          cols="1" 
          class="mt-3 mr-5"
        >
          <v-hover v-slot="{ hover }">
            <v-icon 
              large 
              @click.stop="$emit('remove')" 
              color="error"
            >{{ hover ? 'mdi-delete-empty' : 'mdi-delete' }}</v-icon>
          </v-hover>
        </v-col>
      </v-row>
      <slot>
        <!-- card content goes here -->
      </slot>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    missingInfo: {
      type: Boolean,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Title'
    },
    title: {
      required: true
    }
  },
  data() {
    return {
      titleModel: '',
    }
  },
  mounted() {
    this.titleModel = this.title;
  },
  computed: {
    missingInfoText() {
      return this.titleModel ? `${this.titleModel} is missing required information` : 'Missing required information';
    }
  },
  watch: {
    titleModel(v) {
      this.$emit('update-title', v);
    }
  }
}
</script>