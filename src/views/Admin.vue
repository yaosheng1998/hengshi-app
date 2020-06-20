<template>
  <div id="admin">
    <div class="login" v-if="!isLogin">
      <p>请扫描二维码进行登录</p>
      <qr-code :qr-url="qrUrl" v-if="qrUrl"/>
    </div>
    <div v-else>
      登录成功
    </div>
  </div>
</template>

<script>
  import QrCode from '../components/QrCode'
  export default {
    mounted() {
      this.login()
    },
    data() {
      return {
        qrUrl: '',
        generate_code: '',
        checkCount: 0,
        timer: '',
        isLogin: false,
      }
    },
    components: {
      QrCode
    },
    methods: {
      login() {
        this.$axios.get('/admin/get_qr_code').then(res => {
          if(res.code === 1) {
            console.log(res)
            this.qrUrl = res.url
            this.generate_code = res.generate_code
            this.loginListener()
          } else {
            console.log('获取二维码地址失败')
          }
        })
      },
      checkLogin() {
        this.$axios.get('/admin/is_logins').then(res => {
          if(res.code === 1){
            this.isLogin = true
          } else {
            this.login()
          }
        })
      },
      loginListener() {
        if(++this.checkCount >= 120) return
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$axios.get(`/admin/is_login/${this.generate_code}`).then(res => {
            console.log(res)
            if(res.code === 1){
              this.isLogin = true
            } else {
              !this.isLogin && this.loginListener()
            }
          })
        }, 1000)
      }
    }
  }
</script>
