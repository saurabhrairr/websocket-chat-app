const socket = io();
var name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
do {
    name = prompt('Please enter your name: ');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
}

});

document.getElementById('sendButton').addEventListener('click', () => {
    sendMessage(textarea.value);
  
});

function sendMessage(message) {
       // Check if the message is not empty
       if (message.trim() !== '') {

           let msg = {
               user: name,
               message: message.trim()
           };
           // Append 
           appendMessage(msg, 'outgoing');
           textarea.value = '';
           scrollToBottom();
   
           // Send to server 
           socket.emit('message', msg);
       }else
       {
              alert('plese enter your massge ')
       }
   }

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Receive messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}