import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false


if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = "https://camp-map-3ms63omedq-an.a.run.app/"
} else {
  axios.defaults.baseURL = "http://localhost:8000/"
}


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

