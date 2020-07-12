<template>
  <div id="edu-user">
    教务网用户
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.commit('setMenuIndex', '1')
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/PC/admin/eduUser";
</style>
