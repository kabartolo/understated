const path = require('path');

module.exports = {
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
    output: {
      dev: path.resolve(__dirname, '../dist_dev'), // change to theme development path
      prod: path.resolve(__dirname, '../dist_prod') // change to theme production path
    },
    src: path.resolve(__dirname, '../src'),
    fonts: path.resolve(__dirname, '../src/fonts'),
    images: path.resolve(__dirname, '../src/images'),
    js: path.resolve(__dirname, '../src/js'),
    sass: path.resolve(__dirname, '../src/sass'),
    theme: path.resolve(__dirname, '../src/theme')
  },
  externals: {
    jquery: 'jQuery'
  },

  /*
   * Settings for various build features.
   */
  features: {
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false,
    },
    browserSync: {
      host: 'localhost:8080',
      proxy: 'localhost:8080',
    },
    imageMin: {
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
    },
    minifyCSS: {},
    styleLint: {},
    uglifyJS: {
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true,
      },
      sourceMap: true,
    },
  },
};
