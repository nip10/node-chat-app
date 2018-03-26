'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _message = require('./utils/message');

var _validation = require('./utils/validation');

var _users = require('./utils/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var users = new _users.Users();

var _process$env = process.env,
    PORT = _process$env.PORT,
    ENV = _process$env.ENV;


var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);

if (ENV !== 'production') {
  var publicPath = _path2.default.join(__dirname, '../public');
  app.use(_express2.default.static(publicPath));
}

io.on('connection', function (socket) {
  console.log('New user connected');

  socket.on('join', function (params, callback) {
    if (!(0, _validation.isRealString)(params.name) || !(0, _validation.isRealString)(params.room)) {
      return callback('Name and room are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', (0, _message.generateMessage)('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', (0, _message.generateMessage)('Admin', params.name + ' has joined'));
    return callback();
  });

  socket.on('createMessage', function (message, callback) {
    var user = users.getUser(socket.id);
    if (user && (0, _validation.isRealString)(message.text)) {
      io.to(user.room).emit('newMessage', (0, _message.generateMessage)(user.name, message.text));
    }
    return callback();
  });

  socket.on('createLocationMessage', function (coords) {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', (0, _message.generateLocationMessage)(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', function () {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', (0, _message.generateMessage)('Admin', user.name + ' has left'));
    }
  });
});

server.listen(PORT, function () {
  console.log('Server is up on port ' + PORT + ' in ' + ENV + ' mode.');
});