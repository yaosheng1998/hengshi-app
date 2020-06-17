<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  mounted() {
    // console.log(params)
    this.$axios.post('/api/query/login', {
      username: '17670231',
      password: '020551',
      nanyue: 'false'
    }).then(res => {
      console.log(res)
    })
  },
  components: {
    HelloWorld
  },

}
</script>
