const io = require('socket.io')(8000, {
    cors: {
        origin: "*",  // Allow connections from any origin (for development purposes)
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        console.log("New user joined:", userName);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message => {  // Fixed the spelling of 'message'
        socket.broadcast.emit('receive', { userName: users[socket.id], message: message }); // Fixed spelling of 'receive' and 'message'
    });

    socket.on('disconnect', () => { // Removed the unused 'message' parameter
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
