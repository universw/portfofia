// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDjo6SjdfLCNtNN4lT8aKORY7CIP-WJH9U",
  authDomain: "portfofia.firebaseapp.com",
  databaseURL: "https://portfofia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfofia",
  storageBucket: "portfofia.appspot.com",
  messagingSenderId: "633781124250",
  appId: "1:633781124250:web:c6680357071539a254f323"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const chatRef = db.ref("chatbox");

// DOM
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const clearBtn = document.getElementById("clear-chat");

// Submit user message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (message) {
    chatRef.push({
      text: message,
      sender: "user",
      timestamp: Date.now()
    });
    chatInput.value = "";
    chatInput.focus();
  }
});

// Load chat messages with delete option
chatRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  const key = snapshot.key;
  const div = document.createElement("div");
  div.className = data.sender === "admin" ? "chat-message admin-message" : "chat-message user-message";

  const span = document.createElement("span");
  span.textContent = data.text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => {
    if (confirm("Delete this message?")) {
      chatRef.child(key).remove();
      div.remove();
    }
  };

  div.appendChild(span);
  div.appendChild(delBtn);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Clear all messages
clearBtn.addEventListener("click", () => {
  if (confirm("Clear all chat messages?")) {
    chatRef.remove();
    chatMessages.innerHTML = "";
  }
});