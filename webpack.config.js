const path = require('path');
module.exports = {
  entry: ['./js/main.js'],
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'js/'),
    filename: 'bundle.js',
    publicPath: 'js/'
  },
  devtool: 'source-maps'
};
