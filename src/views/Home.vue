<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted() {
    let token = this.$tools.getUrlSearch().code
    let to = this.$tools.getUrlSearch().state
    if(to){
      this.$router.replace({
        name: to,
        params: {
          token
        }
      })
    }
  },
  components: {},
}
</script>
