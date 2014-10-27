var TeaScript     = require('./tea-script');
var child_process = require('child_process');
var path          = require('path');

function loadFile(module, filename) {
  var result = TeaScript._compileFile(filename, false);
  module._compile(result, filename);
}

if (require.extensions) {
  require.extensions.tea = loadFile;
}

if (child_process) {
  var fork = child_process.fork;
  var binary = require.resolve('../../bin/coffee');
  child_process.fork = function(path, args, options) {
    if (/\.tea$/.test(path)) {
      if (!Array.isArray(args)) {
        options = args || {};
        args = [];
      }
      args = [path].concat(args);
      path = binary;
    }
    fork(path, args, options);
  };
}
