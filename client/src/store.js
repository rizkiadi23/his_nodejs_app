import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000`,
    email: null,
    userId: null
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.email = auth.getEmail()
        state.userId = auth.getUserId()
        state.avatar = auth.getAvatar()
      } else {
        state.userId = null
        state.email = null
        state.avatar = null
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})