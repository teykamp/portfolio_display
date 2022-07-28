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
      :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
      label="Professional Title"
      v-model="data.professionalTitle"
      :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
      label="Headshot URL"
      v-model="data.headshotURL"
      ></v-text-field>
      <v-text-field
      label="Email"
      v-model="data.email"
      :rules="[rules.email]"
      ></v-text-field>
      <v-text-field
      label="Phone Number"
      v-model="data.phone"
      :rules="[rules.phone]"
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
import AddLinkDialog from './NonPortfolioComponents/AddLinkDialog.vue'

export default {
  components: { Toolbar, AddLinkDialog },
  props: ['userData'],
  data() {
    return {
      data: {},
      showLinkDialog: false,
      selectedLinkItem: undefined,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        phone: value => {
          const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
          return pattern.test(value) || 'Invalid phone number'
        }
      }
    }
  },
  created() { 
    this.data = this.userData.header;
  },
  destroyed() {
    this.emitDataToGrandparent()
  },
  methods: {
    emitDataToGrandparent() {
      this.$parent.$emit('update-component-data', {
        componentType: 'header',
        content: this.data
      });
    }
  }
}
</script>