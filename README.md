# Understated theme boilerplate

This is a WordPress theme boilerplate based on [Underscores](https://github.com/Automattic/_s) by Automattic. It gives you a good start with support for Bootstrap, React and ES6. It also features Browsersync for hot reloading.

## Setup

1. In `build/theme_data`, modify `data.json` with your theme data. This will populate the Mustache tags in the theme files when the theme is built.

2. For hot reloading, if not using port 8080, be sure to change the host and proxy in `build/webpack.settings.js`:
```
browserSync: {
  host: 'localhost:8080',
  proxy: 'localhost:8080',
},
```

3. To build the theme, first run `npm install` to install all node modules.

Go through webpack settings carefully and change them as required by your project. Be sure to change the output paths in `build/webpack.settings.js`:
```
output: {
  dev: path.resolve(__dirname, '../dist_dev'), // change to theme development path
  prod: path.resolve(__dirname, '../dist_prod') // change to theme production path
},
```
Caution! These paths will be deleted and re-built in the following step if they exist. If you're just testing how it all works, leave the paths as-is.

For development, I recommend setting this path to your local WordPress installation's theme folder.

4. For local development, run `npm run build:dev`.

Or run `npm run watch` to start Browsersync (this will open the site in a new browser window).
