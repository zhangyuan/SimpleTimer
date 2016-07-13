 module.exports = {
     entry: './app/application.js',
     output: {
         path: './dist',
         filename: 'application.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
         }]
     }
 };