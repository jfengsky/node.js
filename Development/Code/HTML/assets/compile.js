
var path = require('path');
var source = path.resolve(__dirname, 'mods');

module.exports = {
  jsContatFiles: function(target) {
    var ret = {};
    ret[path.resolve(target, 'index.js')] = [
      path.resolve(source, 'language/language.js'),
      path.resolve(source, 'idb/idb.js')
    ];

    return ret;
  },  
  cssMinifyFiles: function(target) {
    var ret = {};
    ret[path.resolve(target, 'index.css')] = [
      path.resolve(source, 'reset.css'),
      path.resolve(source, 'language/language.css'),
      path.resolve(source, 'idb/idb.css')
    ];

    return ret;
  },
}
