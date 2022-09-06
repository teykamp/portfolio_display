<template>
  <v-row 
    align="center" 
    justify="center" 
    class="mx-3"
  >
    <v-col 
      sm="12" 
      md="8"
    >
      <v-card
        :color="item.color"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h5"
              v-text="capitalize(item.name)"
            ></v-card-title>

            <v-card-subtitle v-text="item.desc"></v-card-subtitle>

            <v-card-actions>
              <v-btn v-if="!item.added"
                class="ml-2 mt-5"
                outlined
                rounded
                small
                @click.stop="$emit('toggle-added')"
              >
                <v-icon>mdi-plus</v-icon>
                Add To Portfolio
              </v-btn>
              <v-btn v-else
                class="ml-2 mt-5"
                outlined
                rounded
                small
              >
                <v-icon>mdi-check</v-icon>
                Added To Portfolio
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="require(`../../assets/componentImgs/${imgKeys[item.name]}`)"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import imgKeys from '../../assets/componentImgs/imgKeys'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgKeys
    }
  },
  methods: {
    capitalize(s) {
      return `${s[0].toUpperCase()}${s.substring(1)}`;
    }
  }
}
</script>