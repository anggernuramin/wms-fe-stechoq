import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidebarOpen: true
  },
  getters: {},
  mutations: {
    toogleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    }
  }
})
