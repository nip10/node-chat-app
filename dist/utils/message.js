'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateMessage = function generateMessage(from, text) {
  return {
    from: from,
    text: text,
    createdAt: (0, _moment2.default)().valueOf()
  };
};

var generateLocationMessage = function generateLocationMessage(from, latitude, longitude) {
  return {
    from: from,
    url: 'https://www.google.com/maps?q=' + latitude + ',' + longitude,
    createdAt: (0, _moment2.default)().valueOf()
  };
};

module.exports = { generateMessage: generateMessage, generateLocationMessage: generateLocationMessage };