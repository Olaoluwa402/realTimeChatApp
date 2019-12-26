const socket = io('http://localhost:3000');


const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');


const name = prompt("What is your name");
        appendMessage('You Joined');
        socket.emit('new-user', name);

socket.on('chat-message', data => {
	// console.log(data);
	appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name => {
	appendMessage(`${name} disconnected`);
});

socket.on('user-disconnected', name => {
	appendMessage(`${name} connected`);
});

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = messageInput.value;
	appendMessage(`You: ${message}`);
	socket.emit('send-chat-message', message);
	messageInput.value = '';
});

function appendMessage(message){
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageElement.style.backgroundColor = "lightblue";
	messageContainer.append(messageElement);

}