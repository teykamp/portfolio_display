<template>
  <div>
    <v-toolbar style="position: fixed; z-index: 2; width: 100vw;">
      <v-icon @click="$parent.editComponentView = false;">mdi-chevron-left</v-icon>
      <span style="font-weight: bold; font-size: 15pt;" class="ml-1">Header Data</span>
    </v-toolbar>

    <div style="width: 100vw; height: 10vh;"></div>

    <v-text-field
    label="Name"
    v-model="data.name"
    ></v-text-field>
    <v-text-field
    label="Professional Title"
    v-model="data.professionalTitle"
    ></v-text-field>
    <v-text-field
    label="Headshot URL"
    v-model="data.headshotURL"
    ></v-text-field>
    <v-text-field
    label="Email"
    v-model="data.email"
    ></v-text-field>
    <v-text-field
    label="Phone Number"
    v-model="data.phone"
    ></v-text-field>
    <div v-for="(link, index) in data.links" :key="link.URL">
      <v-row>
        <v-col>
          <v-icon>mdi-{{ link.type }}</v-icon>
          <span>
            <v-text-field
            label="URL"
            v-model="data.links[index].URL"
            ></v-text-field>
          </span>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
export default {
  props: ['headerData'],
  data() {
    return {
      data: {}
    }
  },
  mounted() { 
    this.data = this.headerData;
  }
}
</script>