if ('function' !== typeof Map) {
  throw new Error('ES6 is required; Require Node 0.11.x and add --harmony');
}

var parse     = require('./grammar_parser').parse;
var fs        = require('fs');
var path      = require('path');
var escodegen = require('escodegen');

var compile = exports.compile = function(code) {
  code = parse(code);
  code = ';run(function* () {' + escodegen.generate(code) + '});';
  code += thunkify.toString();
  code += run.toString();
  return code;
};

exports._compileFile = function(filename) {
  var raw = fs.readFileSync(filename, 'utf8');
  var stripped = raw.charCodeAt(0) === 0xFEFF ? raw.substring(1) : raw;

  var result;
  try {
    result = compile(stripped, { filename: filename });
  } catch (err) {
    // TODO better err
    throw err;
  }
  return result;
};

exports.run = function(code, options) {
  if (!options) {
    options = {};
  }
  var mainModule = require.main;

  mainModule.filename = process.argv[1] =
    options.filename ? fs.realpathSync(options.filename) : '.';

  if (mainModule.moduleCache) {
    mainModule.moduleCache = {};
  }

  var dir = path.dirname(mainModule.filename);
  mainModule.paths = require('module')._nodeModulePaths(dir);

  code = compile(code);

  mainModule._compile(code, mainModule.filename);
};

function thunkify (asyncIndex, nodefn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return function (cb) {
      args.splice(asyncIndex, 0, cb);
      nodefn.apply(this, args);
    };
  };
}

function run(genFn) {
  var gen = genFn();
  next();

  function next (er, value) {
    if (er) {
      return gen.throw(er);
    }
    var continuable = gen.next(value);

    if (continuable.done) {
      return;
    }
    var cbFn = continuable.value;
    cbFn(next);
  }
}
