import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidebarOpen: true,
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    toogleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setUser(state, payload) {
      state.user = payload
    }
  }
})
