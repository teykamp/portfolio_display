import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: { /* https://dev.vuetifyjs.com/en/styles/colors/#material-colors */
        primary: colors.indigo.darken1, // #3949AB
        secondary: colors.indigo.lighten3, // #9FA8DA
        accent: colors.amber.base, // #FFC107
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
});
