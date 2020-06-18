import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken() {
      console.log(this)
    }
  },
  actions: {
    async isLogin(state, payload) {
      console.log(payload)
      // if(!payload.token){
      //   return 'fail'
      // }
      let isLogin = await axios.get('/wxfwh/islogin')
      if(isLogin.code === 1){
        return 'success'
      } else{
        let login = await axios.get('/wxfwh/login/' + payload.token)
        if(login.code === 1){
          return 'success'
        }
        return 'fail'
      }
    }
  },
  modules: {}
})
