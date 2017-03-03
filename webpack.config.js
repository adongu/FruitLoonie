module.exports = {
  entry: "./lib/main.js",
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};
