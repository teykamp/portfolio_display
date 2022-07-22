<template>
  <div>
    
    <Toolbar
    :title="'Header'"
    :exitAction="() => $parent.editComponentView = false"
    :disableAddBtn="true"
    />

    <div class="mx-12">
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
      <v-divider></v-divider>

      <div>

        <v-btn class="ma-2" @click="showLinkDialog = true" color="blue" dark rounded>
          <v-icon>
            mdi-plus
          </v-icon>
          Add Social Links
        </v-btn>

        <v-btn class="ma-2" color="grey lighten-3" v-for="(link, index) in data.links" :key="link.id" rounded>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                @click="data.links.splice(index, 1)" 
              >
                mdi-close
              </v-icon>
            </template>
            <span>Delete link</span>
          </v-tooltip> 

          <span @click.stop="selectedLinkItem = link; showLinkDialog = true;">
            {{ link.URL.substring(8,30) }}
          </span>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-{{ link.type }}
              </v-icon>
            </template>
            <span>{{ link.type }}</span>
          </v-tooltip> 
          
        </v-btn>
      </div>

    </div>

    <AddLinkDialog 
    :visible="showLinkDialog"
    :item="selectedLinkItem"
    @close="showLinkDialog = false; selectedLinkItem = undefined;"
    @save="data.links.push($event)"
    @save-edit="data.links[data.links.indexOf(selectedLinkItem)] = $event"
    />

    
      
    

  </div>
</template>

<script>
import Toolbar from '../../ReusableComponents/CreateToolbar.vue'
import AddLinkDialog from './AddLinkDialog.vue'

export default {
  components: { Toolbar, AddLinkDialog },
  props: ['userData'],
  data() {
    return {
      data: {},
      showLinkDialog: false,
      selectedLinkItem: undefined
    }
  },
  created() { 
    this.data = this.userData.header;
  },
  methods: {
    linkDialog() {

    }
  }
}
</script>