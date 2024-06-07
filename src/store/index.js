import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidebarOpen: true,
    user: {}
  },
  getters: {},
  mutations: {
    toogleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    }
  }
})
