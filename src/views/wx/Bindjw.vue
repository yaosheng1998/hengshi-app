<template>
  <div id="bindjw">
    <input type="text" v-model="userid">
    <input type="text" v-model="password">
    <div class="bind" @click="bindjw">绑定</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.getToken())
      this.token = this.getToken()
    },
    data() {
      return {
        token: '',
        userid: '',
        password: ''
      }
    },
    methods: {
      getToken() {
        let params = window.location.search
        params = params.substring(1, params.length)
        params = params.split('&')
        params = params.reduce((prev, item, index, arr) => {
          let _arr = item.split('=')
          prev[_arr[0]] = _arr[1]
          return prev
        }, {})
        console.log(params)
        return params.token
      },
      bindjw() {
        this.$axios.get('/api/wxfwh/login/' + this.token).then(res => {
          console.log(res)
          if(res.data.code === 1){
            return this.$axios.post('/api/wxfwh/bindjw', {
              "userid": this.userid,
              "password": this.password
            })
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/mobile/reset.css";
</style>
