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

// Check if the user is already signed in on page load
window.onload = function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('signin-section').style.display = 'none';
        document.getElementById('homepage-section').style.display = 'block';
        document.getElementById('username-display').innerText = username;
    }
};
