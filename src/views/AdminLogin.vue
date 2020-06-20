<template>
  <div id="admin-login">
    <el-button type="primary" @click="adminLogin">确认登录</el-button>
    <br>
    code: {{code}}
    <br>
    generate_code: {{generate_code}}
    <br>
    登录结果: {{ res }}
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.$route)
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
          console.log(res)
          this.res = res
        })
      }
    }
  }
</script>
