import { createStore } from 'vuex'

export default createStore({
  state: {
    user: (localStorage.getItem("loginData") && JSON.parse(localStorage.getItem("loginData"))) || {}
  },
  getters: {

  },
  mutations: {
    Login(state, value) {
      state.user = value
    }
  },
  actions: {

  },
  modules: {
  }
})
// json-server --watch db.json