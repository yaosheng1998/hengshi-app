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

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
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

  .el-message{
    width: 90vw !important;
    min-width: 70vw !important;
  }
</style>
