require('lazy-ass');
var check = require('check-more-types');

describe('replace vars', function () {
  var replace = require('./replace-vars');

  var pkg = {
    name: 'foo',
    version: '1.0.0'
  };

  it('replaces spaced arguments', function () {
    la(check.fn(replace));
    var result = replace(pkg, ['something', 'pkg.name']);
    la(check.array(result));
    la(result.length === 2);
    la(result[0] === 'something');
    la(result[1] === 'foo');
  });

  it('replaces multiple spaced arguments', function () {
    var result = replace(pkg, ['pkg.name', 'pkg.version']);
    la(check.array(result));
    la(result.length === 2);
    la(result[0] === 'foo');
    la(result[1] === '1.0.0');
  });

});
