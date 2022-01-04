import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    facilities: null,
    dialog: false
  },
  mutations: {
    updateFacilities(state, info) {
      state.facilities = info.items;
    },
    switchDialog(state) {
      state.dialog = !state.dialog;
    }
  },
  getters: {
    facility: state => state.facilities,
    dialog: state => state.dialog
  }
})