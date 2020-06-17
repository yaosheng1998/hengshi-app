<template>
  <div id="invoke">
    WeixinJSBridge: {{ obj }}
  </div>
</template>

<script>
  export default {
    mounted() {
      this.obj = WeixinJSBridge
    },
    data() {
      return {
        obj: ''
      }
    }
  }
</script>
