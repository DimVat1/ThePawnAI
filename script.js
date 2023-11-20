// Function to simulate signing in
function signIn() {
    // Get values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // In a real application, you'd perform server-side authentication here
    // For simplicity, we'll just check if the username and password are not empty
    if (username.trim() !== '' && password.trim() !== '') {
        // Save user information to local storage
        saveUserInfo(username);

        // Hide the sign-in section
        document.getElementById('signin-section').style.display = 'none';

        // Show the homepage section
        document.getElementById('homepage-section').style.display = 'block';
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to save user information to local storage
function saveUserInfo(username) {
    localStorage.setItem('username', username);
}

// Function to check if the user is already signed in
function checkSignIn() {
    const username = localStorage.getItem('username');

    if (username) {
        // User is signed in, show the homepage section
        document.getElementById('signin-section').style.display = 'none';
        document.getElementById('homepage-section').style.display = 'block';
    }
}

// Check if the user is already signed in on page load
window.onload = function () {
    checkSignIn();
};
