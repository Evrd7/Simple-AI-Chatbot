async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');


    const message = userInput.value.trim();
    if (!message) return;


    const userMsgElem = document.createElement('div');
    userMsgElem.textContent = "You: " + message;
    chatWindow.appendChild(userMsgElem);

    userInput.value = '';
}