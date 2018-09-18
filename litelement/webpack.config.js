const path = require('path');

module.exports = {
  entry: './logic/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'development'
}