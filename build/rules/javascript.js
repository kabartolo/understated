const config = require('../app.config')

module.exports = {
  test: /\.js$/,
  loader: ['babel-loader', 'eslint-loader']
}