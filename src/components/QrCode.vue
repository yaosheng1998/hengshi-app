<template>
  <div class="qrcode" ref="qrCodeUrl"></div>
</template>

<script>
  import QRCode from 'qrcodejs2'

  export default {
    props: {
      qrUrl: {
        type: String,
        required: true
      }
    },
    mounted() {
      console.log(this.qrUrl)
      this.createQrCode()
    },
    methods: {
      createQrCode() {
        let qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: this.qrUrl, // 需要转换为二维码的内容
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        })
      }
    }
  }
</script>

<style lang="less">
  .qrcode {
    display: inline-block;
    padding: 10px;
    background-color: #fff;
    /*width: 200px;*/
    /*height: 200px;*/
  }
</style>
