const path = require('path');
const webpack = require('webpack');
const isdev = require('isdev');
const autoprefixer = require('autoprefixer');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { render } = require('./helpers/helpers');

const sassRules = require('./rules/sass');
const jsRules = require('./rules/javascript');
const imageRules = require('./rules/images');

const config = require('./app.config');
const data = require('./theme_data/data.json');

module.exports = {
  devtool: (isdev && config.settings.sourceMaps) ? 'source-map' : undefined,
  entry: config.entry,
  output: {
    path: config.paths.dist,
    filename: config.output.js
  },
  module: {
    rules: [
      sassRules,
      jsRules,
      imageRules
    ]
  },
  externals: config.externals,

  /*
   * Required for Browsersync to work in a VM (e.g., if you're using VVV)
   */
  watchOptions: {
    poll: true
  },
  plugins: [
    new CleanPlugin(config.paths.dist, { allowExternal: true }),
    new CopyPlugin([{
      context: config.paths.theme,
      ignore: ['theme_slug.pot'],
      from: '**/*',
      transform: (content) => render(content, data),
      to: config.paths.dist
    }]),
    new CopyPlugin([{
      context: config.paths.theme,
      from: 'languages/theme_slug.pot',
      transform: (content) => render(content, data),
      to: `languages/${data.theme.slug}.pot`
    }]),

    /* 
     * Copy and output source js files.
     * Delete this plugin to prevent these being 
     * in the final theme.
     */
    new CopyPlugin([{
      context: config.paths.js,
      ignore: ['app.js'],
      from: '**/*',
      transform: (content) => render(content, data),
      to: 'js'
    }]),

    /* 
     * Copy and output source sass files.
     * Delete this plugin to prevent these being
     * in the final theme.
     */
    new CopyPlugin([{
      context: config.paths.sass,
      from: '**/*',
      transform: (content) => render(content, data),
      to: 'sass'
    }]),

    /*
     * Compile sass files to style.css
     */
    new MiniCssExtractPlugin({ filename: config.output.css }),
  ],
  optimization: {
    minimizer: []
  }
}

/** 
 * Adds OptimizeCSSAssetsPlugin if 
 * minifying CSS is configured and we're
 * in production mode.
 */
if (config.settings.minifyCSS && !isdev) {
  module.exports.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin(config.settings.minifyCSS)
  );
}

/** 
 * Adds UglifyJsPlugin if 
 * uglifying JS is configured and we're
 * in production mode.
 */
if (config.settings.uglifyJS && !isdev) {
  module.exports.optimization.minimizer.push(
    new UglifyJsPlugin(config.settings.uglifyJS)
  );
}

/** 
 * Adds ImageminPlugin if
 * in production mode.
 */
if (!isdev) {
  module.exports.plugins.push(
    new ImageminPlugin(config.settings.imageMin)
  );
}

/**
 * Adds Stylelint plugin if
 * linting is configured.
 */
if (config.settings.styleLint) {
  module.exports.plugins.push(
    new StyleLintPlugin(config.settings.styleLint)
  );
}

/**
 * Adds BrowserSync plugin if
 * settings are configured.
 */
if (config.settings.browserSync) {
  module.exports.plugins.push(
    new BrowserSyncPlugin(config.settings.browserSync)
  );
}
