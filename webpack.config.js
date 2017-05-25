module.exports = {
  entry:[
    "./js/libs/PreloadJS-0.6.2/lib/preloadjs-0.6.2.min.js",
    "./js/libs/EaselJS-0.8.2/lib/easeljs-0.8.2.min.js",
    "./js/libs/TweenJS-0.6.2/lib/tweenjs-0.6.2.min.js",
    "./js/libs/SoundJS-0.6.2/lib/soundjs-0.6.2.min.js",
    "./src/main.js"
  ],
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
