async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    const message = userInput.value.trim();
    if (!message) return; // Don't send empty messages

    // Create user message bubble
    const userMsgElem = document.createElement('div');
    userMsgElem.textContent = message;
    userMsgElem.classList.add('chat-msg', 'chat-user');
    chatWindow.appendChild(userMsgElem);

    // Scroll to latest message
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });

    userInput.value = ''; // Clear input field

    // Add a typing indicator while waiting for response
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = `<div></div><div></div><div></div>`;
    chatWindow.appendChild(typingIndicator);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_input: message })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error calling the chatbot');
        }

        const data = await response.json();
        const reply = data.reply;

        // Remove typing indicator
        chatWindow.removeChild(typingIndicator);

        // Create AI response bubble
        const aiMsgElem = document.createElement('div');
        aiMsgElem.textContent = reply;
        aiMsgElem.classList.add('chat-msg', 'chat-assistant');
        chatWindow.appendChild(aiMsgElem);

        // Auto-scroll to latest message
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });

    } catch (err) {
        console.error(err);
        chatWindow.removeChild(typingIndicator);
        
        const errorElem = document.createElement('div');
        errorElem.textContent = "Oops, something went wrong!";
        errorElem.classList.add('chat-msg', 'chat-assistant');
        chatWindow.appendChild(errorElem);
    }
}

// Allow "Enter" key to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
