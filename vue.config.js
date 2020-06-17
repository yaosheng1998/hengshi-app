module.exports = {
  outputDir: 'dist',   //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    open: false, //是否自动弹出浏览器页面
    host: "192.168.2.104",
    port: '8080',
    https: false,   //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      '/api': {
        target: 'https://www.hynuxyk.club', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq(proxyReq, req, res) {
          // console.log(proxyReq)
          console.log('原路径: ' + req.originalUrl)
          console.log('代理路径:' + req.path)
        }
      }
      // '/api': {
      //   target: 'http://open.duyiedu.com',
      //   changeOrigin: true,
      // }
    }
  }
}
