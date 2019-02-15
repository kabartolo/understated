const path = require('path');

/*
 * Change this to your theme's build path
 *  (e.g., 'public_html/wp-content/themes/your-theme').
 * 
 * Warning: This directory will be deleted before each build.
 */
const themePath = '../dist';
const siteURL = 'localhost:8080';

module.exports = {
  distPath: themePath,
  entry: {
    app: [
      './src/js/app.js',
      './src/sass/style.scss',
    ]
  },
  output: {
    css: 'style.css',
    js: 'js/app.js',
    images: 'images/[path][name].[ext]'
  },
  paths: {
    root: path.resolve(__dirname, '../'),
    relative: '../',
    external: /node_modules|bower_components/,
    dist: path.resolve(__dirname, themePath),
    src: path.resolve(__dirname, '../src'),
    fonts: path.resolve(__dirname, '../src/fonts'),
    images: path.resolve(__dirname, '../src/images'),
    js: path.resolve(__dirname, '../src/js'),
    sass: path.resolve(__dirname, '../src/sass'),
    theme: path.resolve(__dirname, '../src/theme')
  },

  /*
   * External libraries.
   */
  externals: {
    jquery: 'jQuery'
  },

  /*
   * Settings for various build features.
   */
  settings: {
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false,
    },

    /* 
     * Note: Use the Browsersync Access URL listed in the console.
     * If inside a VM, use the external URL.
     * You should see "Browsersync: connected" in the browser.
     */
    browserSync: {
      host: siteURL,
      proxy: siteURL,
    },
    minifyCSS: {},
    uglifyJS: {
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    },
    imageMin: {
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false }
    },
    sourceMaps: true,
    styleLint: {},
  }
};
