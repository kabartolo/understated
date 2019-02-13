const config = require('../app.config');

/**
 * Images are handled by webpack plugins.
 */
module.exports = {
  test: /\.(png|jpe?g|gif|svg)$/,
  include: config.paths.images,
  loader: 'file-loader',
  options: {
    name: config.output.images,
    context: config.paths.images,
    publicPath: config.paths.relative,
    emitFile: false
  }
}