import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import md5 from 'js-md5'
import tools from './assets/util/tools'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5
Vue.prototype.$tools = tools
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
