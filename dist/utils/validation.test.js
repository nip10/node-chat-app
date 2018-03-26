'use strict';

var _validation = require('./validation');

describe('isRealString', function () {
  it('should reject non-string values', function () {
    var res = (0, _validation.isRealString)(98);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', function () {
    var res = (0, _validation.isRealString)('   ');
    expect(res).toBe(false);
  });
  it('should allow string with non-space characters', function () {
    var res = (0, _validation.isRealString)('  blabla bleble');
    expect(res).toBe(true);
  });
});