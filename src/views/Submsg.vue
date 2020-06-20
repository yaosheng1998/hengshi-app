<template>
  <div id="submsg" v-if="isShow">
    <div class="bg"></div>
    <div class="top">
<!--      <img src="../assets/image/mobile/submsg-img.jpg" class="submsg-img">-->
      <div class="submsg-img"></div>
      <div class="sub-content">
        <p>订阅内容</p>
        <p>订阅上课通知服务，上课前会有订阅通知哦</p>
        <div class="dis">
          <p>有效期: <i>6个月</i></p>
          <p>订阅价格: <i>￥5</i></p>
        </div>
        <div class="state">
          <p>订阅状态:
            <i :class="{active: issub}">{{ issub?'已订阅':'未订阅' }}</i>
          </p>
          <p v-if="issub">通知服务状态:
            <i :class="{active: isMsgOpen}">{{ isMsgOpen?'开启': '关闭' }}</i>
          </p>
        </div>
      </div>
    </div>
    <el-button type="warning"
               class="sub-btn"
               v-if="!issub"
               @click="onBridgeReady"
    >立即订阅</el-button>
    <div class="options" v-else>
      <el-button type="success" class="open-btn" @click="openSubmsg">开启上课通知</el-button>
      <el-button class="close-btn" @click="closeSubmsg">关闭上课通知</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      // if(typeof WeixinJSBridge === 'undefined'){
      //   alert('未知错误，请重新进入页面。')
      //   return
      // }
      this.token = this.$route.params.token
      this.$store.dispatch('isLogin', {token: this.token}).then(res => {
        if (res === 'success') {
          return this.$axios.get('/wxfwh/isbindjw')
        } else {
          return {code: -1}
        }
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.isbindjw = true
          return this.$axios.get('/wxfwh/is_sub_class')
        } else {
          return {code: -1}
        }
      }).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.issub = true
          return this.$axios.get('/wxfwh/get_notification_status')
        } else {
          this.issub = false
        }
      }).then(res => {
        this.isMsgOpen = false
        if(res.code === 1){
          this.isMsgOpen = true
        }
      })
    },
    data() {
      return {
        token: '',
        issub: '',
        isbindjw: false,
        isMsgOpen: ''
      }
    },
    computed: {
      isShow() {
        return typeof this.issub === 'boolean'
      }
    },
    methods: {
      /**
       * 调起微信支付
       * @returns {Promise<void>}
       */
      async onBridgeReady() {
        if (typeof WeixinJSBridge !== 'undefined') {
          if ( !this.isbindjw) {
            window.alert('您还未绑定教务网，请先绑定教务网!')
            // this.$router.push({name: 'bindjw'})
            return
          }
          let invokeConf = await this.$axios.get('/wxfwh/createsubpay')
          this.payCode = invokeConf
          let _this = this
          if (invokeConf) {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              invokeConf,
              function (res) {
                if (res.err_msg === "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  window.alert('订阅成功！')
                  _this.issub = true
                } else {
                  window.alert('支付失败！')
                }
              });
          }
        } else {
          window.alert('未知错误，请重新进入页面。')
        }
      },
      /**
       * 开启上课通知
       */
      openSubmsg() {
        this.$axios.get('/wxfwh/open_class_notification').then(res => {
          console.log('开启上课:', res)
          if(res.code === 1){
            alert('已开启上课通知!')
            this.isMsgOpen = true
          } else {
            alert('开启上课通知失败!')
          }
        })
      },
      /**
       * 关闭上课通知
       */
      closeSubmsg() {
        this.$axios.get('/wxfwh/close_class_notification').then(res => {
          console.log('关闭上课:', res)
          if(res.code === 1){
            alert('已关闭上课通知!')
            this.isMsgOpen = false
          } else {
            alert('关闭上课通知失败!')
          }
        })
      },
    }
  }
</script>

<style lang="less">
  @import "../assets/style/mobile/reset.css";
  @import "../assets/style/mobile/Submsg";
</style>
