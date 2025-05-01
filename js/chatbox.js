// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjo6SjdfLCNtNN4lT8aKORY7CIP-WJH9U",
    authDomain: "portfofia.firebaseapp.com",
    databaseURL: "https://portfofia-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfofia",
    storageBucket: "portfofia.firebasestorage.app",
    messagingSenderId: "633781124250",
    appId: "1:633781124250:web:c6680357071539a254f323"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Database reference
  const db = firebase.database();
  const chatRef = db.ref('messages');
  
  // Get chat form elements
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  
  // Send new message
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = chatInput.value.trim();
  
    if (messageText) {
      const newMessage = {
        text: messageText,
        timestamp: Date.now()
      };
  
      chatRef.push(newMessage)
        .then(() => {
          chatInput.value = '';
          chatInput.focus();
        })
        .catch((error) => {
          alert('Error sending message: ' + error.message);
        });
    }
  });
  
  // Listen and display messages
  chatRef.limitToLast(50).on('child_added', (snapshot) => {
    const data = snapshot.val();
    displayMessage(data.text);
  });
  
  // Display message in chat
  function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }