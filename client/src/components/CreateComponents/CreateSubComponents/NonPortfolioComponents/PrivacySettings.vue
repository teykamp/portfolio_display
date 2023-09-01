<template>
  <DialogBox
    title="Privacy Settings"
    description="Setting portfolio to private ensures
    no one but you can view your work. Generating
    a link on private mode allows you to share your
    portfolio with others with the link."
    :visible="showPrivacySettingsDialog"
  >
    <template #actions>

      <!-- Loading UI State -->
      <v-container v-if="loading" fill-height>
        <v-skeleton-loader
          width="100%"
          type="paragraph"
        ></v-skeleton-loader>

        <v-row
          align="center"
          justify="center"
          class="mt-7"
        >
          <v-skeleton-loader
            width="60%"
            height="50"
            type="image"
          ></v-skeleton-loader>
        </v-row>
      </v-container>

      <v-container v-else pt-0 fill-height>

        <v-row>
          <v-divider></v-divider>
        </v-row>

        <v-row>
          <v-card-title
            class="pa-0"
            style="word-break: break-word"
          >
            Toggle Portfolio Visibility
          </v-card-title>
        </v-row>

        <v-row align="center">
          <v-switch
            class="mr-2"
            v-model="privacySettings.visibility"
          ></v-switch>
          <v-icon class="mr-1">{{ lockIcon }}</v-icon>
          <b>{{ visibilityInText }}</b>
        </v-row>

        <v-row align="center" v-if="!privacySettings.visibility">
          <v-btn
            v-if="!privacySettings.accesskey"
            small
            @click.stop="generateLink"
          >Generate Link For Sharing</v-btn>

          <v-row class="ml-1" v-else>
            <p class="py-1 px-2 link-container"
            >{{ link }}</p>
            <v-col>
              <v-row dense>
                <v-icon
                  color="error"
                  class="mb-4 ml-2"
                  @click.stop="deleteLink"
                >mdi-delete-outline</v-icon>
              </v-row>
              <v-row dense>
                <v-icon
                  color="info"
                  class="mb-4 ml-2"
                  @click.stop="copyLinkToClipboard"
                >{{ clipboardIcon }}</v-icon>
              </v-row>
            </v-col>
          </v-row>
        </v-row>
        <v-row
          class="mt-12"
          justify="center"
          align="center"
        >
          <v-btn
            @click.stop="$emit('close')"
            color="info"
          >Done</v-btn>
        </v-row>
      </v-container>

    </template>
  </DialogBox>
</template>

<script>
import DialogBox from '../../../ReusableComponents/DialogBox.vue'
import DatabaseServices from '../../../../DatabaseServices'

export default {
  components: {
    DialogBox
  },
  props: {
    showPrivacySettingsDialog: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      // true if link has been successfully copied to clipboard
      clipboardSuccess: false,

      // populated with privacySettings object once get request executes
      privacySettings: {
        visibility: true,
        accesskey: null
      },

      // true when loading state is active
      loading: true,

      // get name of logged in user
      username: localStorage.getItem('username')
    }
  },
  computed: {
    lockIcon() {
      return this.privacySettings.visibility ? 'mdi-lock-open' : 'mdi-lock';
    },
    visibilityInText() {
      return this.privacySettings.visibility ? 'Public' : 'Private';
    },
    generateLinkButton() {
      return !this.privacySettings.visibility;
    },
    clipboardIcon() {
      return this.clipboardSuccess ? 'mdi-check-underline' : 'mdi-clipboard-multiple-outline';
    },
    link() {
      return `https://popout.up.railway.app/display/${this.username}?accesskey=${this.privacySettings.accesskey}`;
    }
  },
  methods: {
    async copyLinkToClipboard() {
      try {
        await navigator.clipboard.writeText(this.link);
        this.clipboardSuccess = true;
        this.$store.state.snackbarText = 'Link copied to clipboard!';
      } catch {
        this.$store.state.snackbarText = 'Failed to copy to clipboard :(';
      }
    },
    generateLink() {
      this.privacySettings.accesskey = Math.random().toString().substring(2, 9);
      this.$store.state.snackbarText = "New link generated!";
    },
    deleteLink() {
      this.privacySettings.accesskey = null;
      this.$store.state.snackbarText = 'Link deleted.';
    }
  },
  watch: {
    clipboardSuccess(v) {
      if (v) {
        setTimeout(() => {
          this.clipboardSuccess = false;
        }, 2000);
      }
    },
    privacySettings: {
      deep: true,
      async handler(v) {
        try {
          await DatabaseServices.updatePorfolioPrivacy(v);
        } catch (error) {
          this.$store.state.snackbarText = 'Issue encountered whilst saving privacy settings.';
          console.error(error, 'Put request failed');
        }
      }
    },
    // runs like a mounted lifecycle hook
    async showPrivacySettingsDialog(v) {
      if (v) {
        this.loading = true;
        try {
          this.privacySettings = await DatabaseServices.getPortfolioPrivacyByUsername(this.username);

          // sets watcher on visibility after privacySettings are loaded in
          this.$watch(() => this.privacySettings.visibility, (v) => {
            const MSG = v ? "Portfolio now publicly visible." : "Private mode activated."
            this.$store.state.snackbarText = MSG;
          })
        } catch {
          this.$store.state.snackbarText = 'Failed to load privacy settings.';
          this.$emit('close');
        }

        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
  .link-container {
    user-select: all;
    background-color: rgb(240, 240, 240);
    width: 80%;
    border-radius: 5px;
  }
</style>