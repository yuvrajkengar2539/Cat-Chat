const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // When a new user joins
    socket.on('new-user-joined', (userName) => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    // When a user sends a message
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { userName: users[socket.id], message: message });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
