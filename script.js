// Function to simulate signing in
function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() !== '' && password.trim() !== '') {
        saveUserInfo(username);
        showHomepage(username);
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to save user information to local storage
function saveUserInfo(username) {
    localStorage.setItem('username', username);
}

// Function to show the homepage after signing in
function showHomepage(username) {
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('homepage-section').style.display = 'block';
    document.getElementById('username-display').innerText = username;
}

// Function to simulate interacting with a virtual agent or a human
function interact(interactionType) {
    const username = localStorage.getItem('username');

    if (username) {
        if (interactionType === 'virtual') {
            // Redirect to the virtual agent page
            window.location.href = 'virtual-agent.html';
        } else if (interactionType === 'human') {
            // Redirect to the human volunteers page
            window.location.href = 'human-volunteers.html';
        }
    } else {
        showSignIn();
        alert('Please sign in first.');
    }
}

// Function to show the sign-in section
function showSignIn() {
    document.getElementById('signin-section').style.display = 'block';
    document.getElementById('homepage-section').style.display = 'none';
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
    messageElement.innerHTML = message;
    chatMessages.appendChild(messageElement);
}

// Function to send a message to the virtual agent
function sendMessage() {
    const userMessage = document.getElementById('user-message').value;

    if (userMessage.trim() !== '') {
        // Display user message in the chat box
        displayMessage('user', userMessage);

        // Fetch answers from Google
        fetchAnswersFromGoogle(userMessage);
    }
}

// Function to fetch answers from Google
function fetchAnswersFromGoogle(query) {
    const googleApiKey = 'AIzaSyDPVqP6l-NdTAJ1Zg5oKFiLORz-M5tDZvE';
    const googleEngineId = 'e66093057c55d4a1d';

    axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleEngineId}&q=${query}`)
        .then((response) => {
            const searchResults = response.data.items;

            if (searchResults && searchResults.length > 0) {
                const topResult = searchResults[0];
                const title = topResult.title;
                const snippet = topResult.snippet;
                const link = topResult.link;

                const googleResponse = `<p>AI Chatbot: ${title}. Here's a snippet: ${snippet}<br><a href="${link}" target="_blank">Read more</a></p>`;
                displayMessage("AI Chatbot", googleResponse);
            } else {
                const noResultsResponse = "<p>AI Chatbot: I couldn't find any relevant results.</p>";
                displayMessage("AI Chatbot", noResultsResponse);
            }
        })
        .catch((error) => {
            console.error("Error fetching Google results:", error);
            const errorMessage = "<p>AI Chatbot: Sorry, I encountered an error while fetching results from Google.</p>";
            displayMessage("AI Chatbot", errorMessage);
        });
}

// Function to submit the Join Us form and save emails to a file
function submitJoinUsForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name.trim() !== '' && email.trim() !== '') {
        // Save email to a file
        saveEmailToFile(name, email);

        // Redirect to the Volunteer page
        window.location.href = 'volunteers.html';
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to save email to a file
function saveEmailToFile(name, email) {
    const data = `Name: ${name}, Email: ${email}\n`;

    // Using FileSaver.js to save the file
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'emails.txt');
}


// Check if the user is already signed in on page load
window.onload = function () {
    const username = localStorage.getItem('username');
    if (username) {
        showHomepage(username);
    }
};
