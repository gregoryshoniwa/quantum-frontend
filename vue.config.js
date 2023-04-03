module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.(csv|xlsx|xls)$/,
            loader: 'file-loader',
            options: {
                name: `files/[name].[ext]`
            }
          }
        ]
      }
    },
    transpileDependencies: [
      /\bvue-awesome\b/,
      'vue-echarts', 
      'resize-detector'
    ],
    devServer: {
        proxy: ''
       
    },
      publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/' 
    }