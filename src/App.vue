<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.title = '衡师服务小助手'
    },
    data() {
      return {}
    }
  }
</script>

<style lang="less">
  @import "./assets/style/reset.css";
  html, body {
    height: 100%;
    @media only screen and (max-width: 768px) {
      .el-message {
        width: 90vw;
        min-width: 70vw;
      }
    }
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

</style>
