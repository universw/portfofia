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
const auth = firebase.auth();
const chatRef = db.ref("chatbox");

// DOM Elements
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Submit chat message
chatForm?.addEventListener("submit", (e) => {
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

// Display chat messages
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

// ===== AUTHENTICATION =====

// Email Login
function loginWithEmail() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => alert("Logged in as: " + userCred.user.email))
    .catch(err => alert(err.message));
}

// Email Sign-Up
function signUpWithEmail() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => alert("Signed up as: " + userCred.user.email))
    .catch(err => alert(err.message));
}

// Google Login
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("Google login: " + result.user.displayName))
    .catch(err => alert(err.message));
}

// GitHub Login
function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("GitHub login: " + result.user.displayName))
    .catch(err => alert(err.message));
}

// Logout
function userLogout() {
  auth.signOut()
    .then(() => alert("Logged out"))
    .catch(err => alert(err.message));
}

// Expose functions to window
window.loginWithEmail = loginWithEmail;
window.signUpWithEmail = signUpWithEmail;
window.loginWithGoogle = loginWithGoogle;
window.loginWithGithub = loginWithGithub;
window.userLogout = userLogout;

// Handle login state
auth.onAuthStateChanged((user) => {
  const contactForm = document.getElementById("contact-form");
  const chatboxSection = document.getElementById("chatbox");
  const reminder = document.getElementById("login-reminder");

  if (user) {
    if (contactForm) contactForm.style.display = "block";
    if (chatboxSection) chatboxSection.style.display = "block";
    if (reminder) reminder.style.display = "none";
  } else {
    if (contactForm) contactForm.style.display = "none";
    if (chatboxSection) chatboxSection.style.display = "none";
    if (reminder) reminder.style.display = "block";
  }
});