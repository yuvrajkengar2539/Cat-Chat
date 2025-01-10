const http = require('http');  // Import the http module
const express = require('express');  // Import express
const socketIo = require('socket.io');  // Import socket.io

const app = express();  // Create an express app
const server = http.createServer(app);  // Create an HTTP server using express app
const io = socketIo(server, {  // Initialize socket.io with the server
    cors: {
        origin: "https://cat-chat-frontend.netlify.app",  // Replace with your actual frontend URL
        methods: ["GET", "POST"]
    }
});

// Your existing code for socket.io events
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send', (message) => {
        io.emit('receive', { userName: 'User', message: message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on the specified port
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
