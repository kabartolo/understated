const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const settings = require('./webpack.settings.js');

const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: settings.paths.output.dev,
    filename: settings.output.js,
  },
  plugins: [
    new CleanPlugin(settings.paths.output.dev, { allowExternal: true }),
    new BrowserSyncPlugin(settings.features.browserSync),
    new StyleLintPlugin(settings.features.styleLint),
  ],
});