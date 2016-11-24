const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'user2',
        text: 'Hey. This is John.'
    });
});

socket.on('newMessage', (message) => {
    console.log('New message', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

