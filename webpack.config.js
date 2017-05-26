module.exports = {
  entry:
    "./src/main.js",
  output: {
  	filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: require.resolve('createjs-easeljs'),
        loader: 'imports?this=>window!exports?window.createjs'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
