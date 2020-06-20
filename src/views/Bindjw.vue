<template>
  <div id="bindjw" v-if="isShow">
    <div class="bg"></div>
    <div class="top">
      <div class="bind-logo iconfont">
        &#xe7bb;
      </div>
      <p class="tip">{{ isbindjw ? '您已经绑定教务网' :
        '您还未绑定教务网, 请输入用户名和密码进行绑定。' }}</p>
      <div class="binded" v-if="isbindjw">
        <span>当前绑定账号: </span>
        <span>{{ userid }}</span>
      </div>
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
    >{{ isbindjw ? '取消绑定' : '立即绑定' }}
    </el-button>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.token = this.$route.params.token
      this.$store.dispatch('isLogin', {token: this.token}).then(res => {
        if(res.code === 'success'){
          return this.$axios.get('/wxfwh/isbindjw')
        } else {
          return { code: -1 }
        }
      }).then(res => {
        console.log(res)
        if(res.code === 1){
          this.isbindjw = true
          this.userid = res.userid
        } else {
          this.isbindjw = false
        }
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
        if (this.isbindjw) {
          this.cancelBindjw()
        } else {
          this.bindjw()
        }
      },
      /**
       * 绑定教务网
       */
      bindjw() {
        this.$axios.post('/wxfwh/bindjw', {
          "userid": this.userid,
          "password": this.password
        }).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.isbindjw = true
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      /**
       * 取消绑定教务网
       */
      cancelBindjw() {
        if(confirm('取消绑定教务网将会导致订阅服务失效，是否取消绑定？')){
          this.$axios.get('/wxfwh/cancel_bind_jw').then(res => {
            console.log(res)
            if (res.code === 1) {
              this.isbindjw = false
            }
            this.$message.error(res.msg)
          })
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/style/mobile/reset.css";
  @import "../assets/style/mobile/bindjw";
</style>
