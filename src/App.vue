<template>
  <div id="app">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link :to="{name: 'Bindjw', query: {token: '123'}}">Bindjw</router-link> |-->
    <!--      <router-link :to="{name: 'Invoke'}">Bindjw</router-link> |-->
    <!--      {{ url }}-->
    <!--    </div>-->
    <!--    {{ url }}-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.url = window.location
    },
    data() {
      return {
        url: ''
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
