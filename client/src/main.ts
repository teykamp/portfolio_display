import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Meta from 'vue-meta'
import { store } from './store/index'

// declares component object prototypes
import './Prototypes'

/* 

components that do not conform to the standard portfolio
component object structure:

componentName: {
  pageRank: int
  content: Array<PortfolioEntry>
}

*/
export const nonStandardComponents = ['header', 'timeline']

// import GAuth from 'vue-google-oauth2'

// const gauthOption = {
//   clientId: '115516349330-ref3fotj7jipjr5e585oabvejo5mtm69.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// };

// Vue.use(GAuth, gauthOption);
Vue.config.productionTip = false;
Vue.use(Meta)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
