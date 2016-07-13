var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'app/application.js')
  ],
  output: {
    path: './dist',
    filename: 'application.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Simple Timer",      
      filename: 'index.html', 
      template: 'app/application.html',     
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
      }]
  }
};