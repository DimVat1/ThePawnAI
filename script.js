document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");

    function sendMessage() {
        const userMessage = userInput.value.trim();

        if (userMessage !== "") {
            appendMessage("user", userMessage);
            // You can add the AI response here.
            // For simplicity, let's just echo the user's message.
            appendMessage("ai", userMessage);
            userInput.value = "";
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.innerText = message;
        chatBody.appendChild(messageElement);

        // Scroll to the bottom to show the latest message
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    window.sendMessage = sendMessage; // Expose the function for the button click
});
