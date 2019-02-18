const path = require('path');
const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { render } = require('./helpers/helpers');

const sassRules = require('./rules/sass');
const jsRules = require('./rules/javascript');
const imageRules = require('./rules/images');

const settings = require('./webpack.settings.js');
const themeData = require('./theme_data/data.json');

module.exports = {
  entry: settings.entry,

  module: {
    rules: [
      sassRules,
      jsRules,
      imageRules,
    ]
  },
  externals: settings.externals,

  /*
   * Required for Browsersync to work in a VM (e.g., if you're using VVV)
   */
  watchOptions: {
    poll: true,
  },
  plugins: [
    /*
     * Copy source theme files to dist folder and
     * render any Mustache template tags with theme data
     */
    new CopyPlugin([{
      context: settings.paths.theme,
      ignore: ['theme_slug.pot'],
      from: '**/*',
      transform: (content) => render(content, themeData),
    }]),
    new CopyPlugin([{
      context: settings.paths.theme,
      from: 'languages/theme_slug.pot',
      transform: (content) => render(content, themeData),
      to: `languages/${themeData.theme.slug}.pot`,
    }]),

    /*
     * Compile sass files to style.css
     */
    new MiniCssExtractPlugin({ 
      filename: settings.output.css,
    }),

    /* 
     * Copy and output source sass files.
     * Delete this plugin to prevent these being
     * in the final theme.
     */
    new CopyPlugin([{
      context: settings.paths.sass,
      from: '**/*',
      transform: (content) => render(content, themeData),
      to: 'sass',
    }]),
  ],
}
