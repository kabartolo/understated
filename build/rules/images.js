const settings = require('../webpack.settings.js');

/**
 * Images are handled by webpack plugins.
 */
module.exports = {
  test: /\.(png|jpe?g|gif|svg)$/,
  include: settings.paths.images,
  loader: 'file-loader',
  options: {
    name: settings.output.images,
    context: settings.paths.images,
    publicPath: settings.paths.relative,
    emitFile: false,
  },
}