'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _message = require('./message');

describe('generateMessage', function () {
  it('should generate a correct message object', function () {
    var from = 'Jen';
    var text = 'Some message';

    var message = (0, _message.generateMessage)(from, text);

    expect(_typeof(message.createdAt)).toBe('number');
    expect(_typeof(message.from)).toBe('string');
    expect(_typeof(message.text)).toBe('string');
    expect(message).toMatchObject({ from: from, text: text });
  });
});

describe('generateLocationMessage', function () {
  it('should generate a correct location object', function () {
    var from = 'Jen';
    var latitude = 32.32323;
    var longitude = 12.54523;
    var url = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;

    var message = (0, _message.generateLocationMessage)(from, latitude, longitude);

    expect(_typeof(message.createdAt)).toBe('number');
    expect(_typeof(message.from)).toBe('string');
    expect(message).toMatchObject({ from: from, url: url });
  });
});