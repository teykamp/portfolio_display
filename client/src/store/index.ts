import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    snackbarText: '',
    clientAuth: null,
  },
  mutations: {
    setSnackbarText(state, text) {
      state.snackbarText = text;
    },
    setClientAuth(state, clientAuth) {
      state.clientAuth = clientAuth;
    },
    resetAuth(state) {
      state.clientAuth = null;
    }
  }
})
