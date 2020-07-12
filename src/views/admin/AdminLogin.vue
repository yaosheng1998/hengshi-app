<template>
  <div id="admin-login">
    <div class="content">
      <i class="iconfont logo">&#xe608;</i>
      <p class="tip">衡师小助手后台登录确认</p>
      <div class="options">
        <div class="confirm" @click="adminLogin">登录</div>
        <div class="cancel" @click="">取消登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.code = this.$route.query.code
      this.generate_code = this.$route.params.generate_code
    },
    data() {
      return {
        code: '',
        generate_code: '',
        res: ''
      }
    },
    methods: {
      adminLogin() {
        this.$axios.get('/admin/login', {
          params: {
            code: this.code,
            generate_code: this.generate_code
          }
        }).then(res => {
          alert(res.msg)
        }, err => {
          alert(err)
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/reset.css";
  @import "../../assets/style/mobile/adminLogin";
</style>
