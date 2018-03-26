'use strict';

var isRealString = function isRealString(str) {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = { isRealString: isRealString };