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
      },
      qrWidth: {
        type: Number,
        default: 200
      },
      qrHeight: {
        type: Number,
        default: 200
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
          width: this.qrWidth,
          height: this.qrHeight,
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
    padding: 5px;
    background-color: #fff;
  }
</style>
