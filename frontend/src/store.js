import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    facilities: null
  },
  mutations: {
    updateFacilities(state, info) {
      state.facilities = info.items;
    }
  },
  getters: {
    facility: state => state.facilities
  }
})