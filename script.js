document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const googleModeButton = document.getElementById("google-mode-button");
    const voiceButton = document.getElementById("voice-button");
    const androidButton = document.getElementById("android-button");
      document.addEventListener("DOMContentLoaded", function () {
    // ... (existing code)

    const gpt3ApiKey = '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'; // Replace with your GPT-3 API key
    const dalleApiKey = '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'; // Replace with your DALL-E API key

    // Function to interact with GPT-3
    function generateResponseWithGPT3(prompt) {
        axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: prompt,
            max_tokens: 100,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gpt3ApiKey}`,
            },
        })
        .then((response) => {
            const gpt3Response = response.data.choices[0].text;
            appendMessage("AI Chatbot", gpt3Response);
        })
        .catch((error) => {
            console.error('Error fetching response from GPT-3:', error);
            appendMessage("AI Chatbot", "I encountered an error while generating a response.");
        });
    }

    // Function to generate an image with DALL-E
    function generateImageWithDALLE() {
        axios.post('https://api.openai.com/v1/files', {
            n: 1,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dalleApiKey}`,
            },
        })
        .then((response) => {
            const imageId = response.data.id;
            const imageUrl = `https://api.openai.com/v1/files/${imageId}/urls`;
            appendImage(imageUrl);
        })
        .catch((error) => {
            console.error('Error generating image with DALL-E:', error);
            appendMessage("AI Chatbot", "I encountered an error while generating an image.");
        });
    }

    // ... (existing code)

    // Add event listeners for new functionality
    gpt3Button.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            appendMessage("You", userMessage);
            generateResponseWithGPT3(userMessage);
            userInput.value = "";
        }
    });

    dalleButton.addEventListener("click", generateImageWithDALLE);
});


    let isGoogleModeActive = false;
    let isListening = false;
    let recognition;

    const voiceButtonIcons = ["🎙️", "🔴"];

    function toggleGoogleMode() {
        isGoogleModeActive = !isGoogleModeActive;
        updateButtonState(googleModeButton, isGoogleModeActive);
    }

    function toggleVoiceRecognition() {
        if (!isListening) {
            if (!recognition) {
                initSpeechRecognition();
            }
            requestMicrophonePermission()
                .then((permissionGranted) => {
                    if (permissionGranted) {
                        recognition.start();
                    } else {
                        console.error("Microphone permission denied.");
                    }
                })
                .catch((error) => {
                    console.error("Error requesting microphone permission:", error);
                });
        } else {
            recognition.stop();
        }
    }

    function requestMicrophonePermission() {
        return new Promise((resolve) => {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    stream.getTracks().forEach((track) => track.stop());
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        });
    }

    function classicConversation(query) {
        const responses = {
            "hello": "Hi there! How can I assist you today?",
            "how are you": "I'm just a chatbot, but I'm here to help. What can I do for you?",
            "what's your name": "I'm a chatbot created to assist with information and tasks.",
            "bye": "Goodbye! If you have more questions in the future, feel free to ask."
        };

        const lowerCaseQuery = query.toLowerCase();
        const response = responses[lowerCaseQuery] || "I'm not sure how to respond to that.";

        appendMessage("AI Chatbot", response);
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();

        if (userMessage !== "") {
            appendMessage("You", userMessage);

            if (isGoogleModeActive) {
                fetchAnswersFromGoogle(userMessage);
            } else {
                classicConversation(userMessage);
            }

            userInput.value = "";
        }
    }

    function updateButtonState(button, isActive) {
        if (isActive) {
            button.classList.add("active");
            button.textContent += " (active)";
        } else {
            button.classList.remove("active");
            button.textContent = button.textContent.replace(" (active)", "");
        }
    }

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

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

                    const googleResponse = `AI Chatbot: ${title}. Here's a snippet: ${snippet}<br><a href="${link}" target="_blank">Read more</a>`;
                    appendMessage("AI Chatbot", googleResponse);
                } else {
                    const noResultsResponse = "AI Chatbot: I couldn't find any relevant results.";
                    appendMessage("AI Chatbot", noResultsResponse);
                }
            })
            .catch((error) => {
                console.error("Error fetching Google results:", error);
                const errorMessage = "AI Chatbot: Sorry, I encountered an error while fetching results from Google.";
                appendMessage("AI Chatbot", errorMessage);
            });
    }

    function initSpeechRecognition() {
        recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isListening = true;
            voiceButton.textContent = voiceButtonIcons[1];
            console.log("Listening...");
        };

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            userInput.value = result;
            sendMessage();
            recognition.stop();
        };

        recognition.onend = () => {
            isListening = false;
            voiceButton.textContent = voiceButtonIcons[0];
            console.log("Stopped listening.");
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            isListening = false;
        };
    }

    function downloadApk() {
        const androidAppFilePath = '/aichat/AI-Chatbot.apk'; // Replace with your file path
        const androidAppDownloadLink = window.location.origin + androidAppFilePath;
        const downloadLink = document.createElement('a');
        downloadLink.href = androidAppDownloadLink;
        downloadLink.download = 'AI-Chatbot.apk';
        downloadLink.click();
        appendMessage("AI Chatbot", "Downloading the Android app...");
        downloadLink.remove();
    }

    // Add event listeners
    sendButton.addEventListener("click", sendMessage);
    googleModeButton.addEventListener("click", toggleGoogleMode);
    voiceButton.addEventListener("click", toggleVoiceRecognition);
    androidButton.addEventListener("click", downloadApk);
});
