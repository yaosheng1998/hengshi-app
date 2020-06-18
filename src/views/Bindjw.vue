<template>
  <div id="bindjw" v-if="isShow">
    <div class="top">
      <div class="bind-logo">
        logo
      </div>
      <p class="tip">{{ isbindjw ? '您已经绑定教务网' :
        '您还未绑定教务网, 请输入用户名和密码进行绑定。' }}</p>
    </div>
    <form class="info-wrapper" v-if="!isbindjw">
      <div class="userid-wrapper">
        <el-input
          placeholder="请输入用户名"
          class="userid"
          v-model="userid"
          clearable>
        </el-input>
      </div>
      <div class="password-wrapper">
        <el-input
          placeholder="请输入密码"
          v-model="password"
          class="password"
          show-password>
        </el-input>
      </div>
    </form>
    <el-button :type="isbindjw ? 'danger' : 'primary'"
               class="bind-btn"
               @click="handleClick"
    >{{ isbindjw ? '取消绑定' : '立即绑定' }}</el-button>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.title = '绑定教务网'
      this.token = this.$route.params.token
      // console.log('token:' + this.token)
      this.$store.dispatch('isLogin', {token: this.token}).then(res => {
        return this.$axios.get('/wxfwh/isbindjw')
      }).then(res => {
        console.log(res)
        this.isbindjw = res.code === 1
      })
    },
    data() {
      return {
        token: '',
        userid: '',
        password: '',
        isbindjw: ''
      }
    },
    computed: {
      isShow() {
        return typeof this.isbindjw === 'boolean'
      }
    },
    methods: {
      handleClick() {
        if(this.isbindjw){
          this.cancelBindjw()
        } else {
          this.bindjw()
        }
      },
      bindjw() {
        return this.$axios.post('/wxfwh/bindjw', {
          "userid": this.userid,
          "password": this.password
        }).then(res => {
          console.log(res)
          if(res.code === 1){
            this.isbindjw = true
            this.$message.success(res.msg)
            // this.$message({
            //   duration: 1000000,
            //   type: 'success',
            //   message: res.msg
            // })
          }
        })
      },
      cancelBindjw() {
        this.$axios.get('/wxfwh/cancel_bind_jw').then(res => {
          console.log(res)
          if(res.code === 1){
            this.isbindjw = false
            this.$message.error(res.msg)
            // this.$message({
            //   duration: 1000000,
            //   type: 'error',
            //   message: res.msg
            // })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/style/mobile/reset.css";
  @import "../assets/style/mobile/bindjw";
</style>
