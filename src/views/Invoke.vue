<template>
  <div id="invoke">
    WeixinJSBridge: {{ WeixinJSBridge }}
    <br>
    isLogin: {{ res }}
    <br>
    isbindjw: {{ isbindjw }}
    <br>
    <el-button type="primary" @click="onBridgeReady">支付</el-button>
    {{ payCode }}
  </div>
</template>

<script>
  export default {
    mounted() {
      this.WeixinJSBridge = WeixinJSBridge
      this.token = this.$route.params.token
      this.$store.dispatch('isLogin', {token: this.token}).then(res => {
        this.res = res
      })
    },
    data() {
      return {
        WeixinJSBridge: '',
        token: '',
        res: '',
        payCode: '',
        isbindjw: ''
      }
    },
    methods: {
      async onBridgeReady() {
        if(typeof this.WeixinJSBridge !== 'undefined'){
          let invokeConf = await this.$axios.get('/wxfwh/createsubpay')
          let isbindjw = await this.$axios.get('/wxfwh/isbindjw')
          this.isbindjw = isbindjw.code
          this.payCode = invokeConf
          if(isbindjw.code === 1 && invokeConf){
            this.WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              invokeConf,
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  window.alert('支付成功')
                } else {
                  window.alert('支付失败')
                }
              });
          }
        }
      }
    }
  }
</script>
