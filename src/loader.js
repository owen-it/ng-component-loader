var consolidate = require('consolidate');
var utils = require('loader-utils');
var extname = require('path').extname;

module.exports = function(content) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var opt = utils.parseQuery(this.query);

  function exportContent(content) {
    if (opt.raw) {
      callback(null, content);
    } else {
      callback(null, "module.exports = " + JSON.stringify(content));
    }
  }

  if(!opt.engine) {
    opt.engine = extname(this.request).substr(1).toLowerCase();
  }

  if(!consolidate[opt.engine]) {
    throw new Error("Engine '"+ opt.engine +"' isn't available in Consolidate.js");
  }

  opt.filename = this.resourcePath;

  consolidate[opt.engine].render(content, opt, function(err, html) {
    if(err) {
      throw err;
    }
    exportContent(html);
  });
};
