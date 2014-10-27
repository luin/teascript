var TeaScript = require('../src/tea-script');
var fs = require('fs');
var path = require('path');
var read = function(filename) {
  return TeaScript.compile(fs.readFileSync(path.join('test', 'basic', filename + '.tea'), 'utf-8'));
};
describe('basic', function() {
  it('should compile successfully', function() {
    var code = read('if');
    var result;
    eval(code);
    result.should.eql([true, true]);
  });
});
