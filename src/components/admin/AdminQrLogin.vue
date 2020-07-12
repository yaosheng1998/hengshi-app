<template>
  <div id="admin-qr-login" v-if="qrUrl">
    <div class="login">
      <p>衡师小助手后台</p>
      <qr-code :qr-url="qrUrl" class="code"/>
      <p class="tip">微信扫码登录</p>
    </div>
  </div>
</template>

<script>
  import QrCode from '../QrCode'
  export default {
    mounted() {
      this.checkLogin()
    },
    data() {
      return {
        qrUrl: '',
        generate_code: '',
        checkCount: 0,
        timer: ''
      }
    },
    components: {
      QrCode
    },
    methods: {
      /**
       * 登录
       */
      login() {
        this.$axios.get('/admin/get_qr_code').then(res => {
          if(res.code === 1) {
            // console.log(res)
            this.qrUrl = res.url
            this.generate_code = res.generate_code
            this.loginListener()
          } else {
            console.log('获取二维码地址失败')
          }
        })
      },
      /**
       * 检查是否登录
       */
      checkLogin() {
        this.$axios.get('/admin/is_logins').then(res => {
          // console.log('验证: ', res)
          if(res.code === 1){
            this.$store.commit('setAdminLogin', true)
          } else if(res.code === -1){
            this.login()
          } else {
            alert('其他错误')
          }
        })
      },
      /**
       * 监听确认登录
       */
      loginListener() {
        if(++this.checkCount >= 120) {
          alert('登录超时')
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$axios.get(`/admin/is_login/${this.generate_code}`).then(res => {
            // console.log(res)
            if(res.code === 1){
              this.$store.commit('setAdminLogin', true)
            } else {
              !this.$store.state.isAdminLogin && this.loginListener()
            }
          })
        }, 1000)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/adminQrLogin";
</style>
