const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',

})

// module.exports = {
//   transpileDependencies: true,
//   assetsDir: 'static',
//   parallel: false,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'https://api4.yoobit.cn',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }

//   }
// }

