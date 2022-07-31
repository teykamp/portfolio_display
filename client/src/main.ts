import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import store from './store'
// import Vuex from 'vuex'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  // store,
  render: h => h(App)
}).$mount('#app')
