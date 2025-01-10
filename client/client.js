const socket = io('https://cat-chat-2gnx.onrender.com');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messegeInp');
const messageContainer = document.querySelector('.container'); 
var audio = new Audio('sound.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('messege');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value; // Fixed variable name to 'message'
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})

const userName = prompt("Enter your name:");
socket.emit('new-user-joined', userName);

socket.on('user-joined', userName => {
    append(`${userName} joined the chat`, 'left'); // Changed position to 'left' since it's not you joining
})

socket.on('receive', data => { // Fixed 'recieve' to 'receive'
    append(`${data.userName}: ${data.message}`, 'left'); // Fixed 'messege' to 'message' to maintain consistency
})

socket.on('left', userName => {
    append(`${userName}: left the chat`, 'left');
})
