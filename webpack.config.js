var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/application.js',
  output: {
    path: './dist',
    filename: 'application.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: "Simple Timer",      
      filename: 'index.html', 
      template: 'app/application.html'     
      // hash: true
    })
  ],
  module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
      }]
  }
};