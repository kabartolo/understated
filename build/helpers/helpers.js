const Mustache = require('mustache');

module.exports = {
  /*
   * Renders Mustache templates
   */
  render: function(buffer, data) {
    return Mustache.render(buffer.toString(), data);
  }
}