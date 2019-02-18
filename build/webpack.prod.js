const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

const CleanPlugin = require('clean-webpack-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: settings.paths.output.prod,
    filename: settings.output.js,
  },
  plugins: [
    new CleanPlugin(settings.paths.output.prod, { allowExternal: true }),
    new ImageminPlugin(settings.features.imageMin),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin(settings.features.uglifyJS),
      new OptimizeCSSAssetsPlugin(settings.features.minifyCSS),
    ],
  },
});