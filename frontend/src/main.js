import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false


if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = "https://camp-map-3ms63omedq-an.a.run.app/"
} else {
  axios.defaults.baseURL = "http://localhost:8000/"
}


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

