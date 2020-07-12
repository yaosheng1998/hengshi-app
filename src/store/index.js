import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdminLogin: false,
    menuIndex: '1',
    updateCurrProgress: 100,
  },
  mutations: {
    setAdminLogin(state, flag) {
      state.isAdminLogin = flag
    },
    setMenuIndex(state, index) {
      state.menuIndex = index
    },
    setUpdateCurrProgress(state, progress) {
      state.updateCurrProgress = progress
    }
  },
  actions: {
    async isFwhLogin(state, payload) {
      // if(!payload.token){
      //   return 'fail'
      // }
      let isLogin = await axios.get('/wxfwh/islogin')
      if(isLogin.code === 1){
        return 'success'
      } else{
        let login = await axios.get(`/wxfwh/login/${payload.token}`)
        if(login.code === 1){
          return 'success'
        }
        return 'fail'
      }
    }
  },
  modules: {}
})
