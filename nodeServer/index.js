const http = require('http');  
const socketIo = require('socket.io');  

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Socket.io server is running');
});

// Initialize Socket.io with CORS handling
const io = socketIo(server, {
    cors: {
        origin: "*",  // Allow all origins for testing, restrict this in production
        methods: ["GET", "POST"]
    }
});

// Object to store connected users
const users = {};

// Handling WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handling a new user joining
    socket.on('new-user-joined', (userName) => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    // Handling message sending
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { userName: users[socket.id], message: message });
    });

    // Handling user disconnection
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

// Start the server on the specified port
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
