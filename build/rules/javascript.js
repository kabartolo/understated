const settings = require('../webpack.settings.js');

module.exports = {
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-env']
      },
    },
    {
      loader: 'eslint-loader'
    },
  ],
  exclude: settings.paths.external,
}