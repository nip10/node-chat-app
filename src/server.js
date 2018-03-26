import path from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import dotenv from 'dotenv';

import { generateMessage, generateLocationMessage } from './utils/message';
import { isRealString } from './utils/validation';
import { Users } from './utils/users';

dotenv.config();

const users = new Users();

const { PORT, ENV } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

if (ENV !== 'production') {
  const publicPath = path.join(__dirname, '../public');
  app.use(express.static(publicPath));
}

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    return callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    return callback();
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);
    if (user) {
      io
        .to(user.room)
        .emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT} in ${ENV} mode.`);
});
