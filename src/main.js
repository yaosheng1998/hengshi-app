import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'js-md5'

axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
