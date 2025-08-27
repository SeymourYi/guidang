const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // webpack3 vue-loader 15.x 需要

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: ['css-loader?sourceMap'],
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
              fallback: 'vue-style-loader'
            }),
            less: ExtractTextPlugin.extract({
              use: ['css-loader?sourceMap', 'less-loader?sourceMap'],
              fallback: 'vue-style-loader'
            })
          },
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },

      // js 文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },

      // CSS 文件
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?sourceMap'],
          fallback: 'style-loader'
        })
      },

      // SCSS 文件
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
          fallback: 'style-loader'
        })
      },

      // LESS 文件
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?sourceMap', 'less-loader?sourceMap'],
          fallback: 'style-loader'
        })
      },

      // 图片文件
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },

      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },

      // 视频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      // 可选，按需添加全局插件
    })
  ]
}
