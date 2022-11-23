import { store } from '../src/store/index'

export default class ClientAuthentication {

  constructor() {
    store.commit('setClientAuth', this)
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  async login() {
    
  }

  logout() {
    localStorage.removeItem('authToken');
    store.commit('resetAuth');
  }
}