const path = require('path');
module.exports = {
  entry: ['./lib/game.js'],
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'js/'),
    filename: 'bundle.js',
    publicPath: 'js/'
  },
  devtool: 'source-maps',
  resolve: {
   extensions: [".js"]
  }
};
