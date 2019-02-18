const isdev = require('isdev');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const settings = require('../webpack.settings.js');

module.exports = {
  test: /\.s[ac]ss$/,
  include: settings.paths.sass,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: isdev
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [autoprefixer(settings.features.autoprefixer)]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ],
};