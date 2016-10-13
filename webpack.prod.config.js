const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/texttrackrenderer'
  ],

  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'texttrackrenderer.js',
    libraryTarget: 'var',
    library: 'TextTrackRenderer',
    publicPath: '/dist/public/'
  },

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src') },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}
