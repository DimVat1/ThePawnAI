// Function to simulate signing in
function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() !== '' && password.trim() !== '') {
        saveUserInfo(username);
        document.getElementById('signin-section').style.display = 'none';
        document.getElementById('homepage-section').style.display = 'block';
        document.getElementById('username-display').innerText = username;
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to save user information to local storage
function saveUserInfo(username) {
    localStorage.setItem('username', username);
}

// Function to simulate interacting with a virtual agent or a human
function interact(interactionType) {
    const username = localStorage.getItem('username');
    const resultElement = document.getElementById('interaction-result');
    
    if (username) {
        let message = '';

        if (interactionType === 'virtual') {
            // Redirect to the virtual agent page
            window.location.href = 'virtual-agent.html';
            return;
        } else if (interactionType === 'human') {
            // Redirect to the human volunteers page
            window.location.href = 'human-volunteers.html';
            return;
        }

        resultElement.innerHTML = `<p>${message}</p>`;
    } else {
        document.getElementById('signin-section').style.display = 'block';
        document.getElementById('homepage-section').style.display = 'none';
        alert('Please sign in first.');
    }
}

// Function to navigate to the Join Us page
function joinUs() {
    window.location.href = 'join-us.html';
}

// Function to submit the Join Us form and redirect to Volunteer page
function submitJoinUsForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name.trim() !== '' && email.trim() !== '') {
        // In a real application, you would send this data to a server for processing
        // For demonstration, we'll just show an alert
        alert(`Join Us Form Submitted:\nName: ${name}\nEmail: ${email}`);

        // Redirect to the Volunteer page
        window.location.href = 'volunteer.html';
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to go back to the homepage
function goBack() {
    window.location.href = 'index.html';
}

// Function to display messages in the chat box
function displayMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'chatgpt-message';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}


// Function to send a message
function sendMessage() {
    const userMessage = document.getElementById('user-message').value;

    if (userMessage.trim() !== '') {
        // Display user message in the chat box
        displayMessage('user', userMessage);

        // Make a direct API call to GPT-3 from the client side (not recommended)
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Replace 'YOUR_API_KEY' with your actual GPT-3 API key
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(responseData => {
            // Display GPT-3 response in the chat box
            displayMessage('gpt3', responseData.choices[0].text);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors gracefully
        });
    }
}

// Check if the user is already signed in on page load
window.onload = function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('signin-section').style.display = 'none';
        document.getElementById('homepage-section').style.display = 'block';
        document.getElementById('username-display').innerText = username;
    }
};
