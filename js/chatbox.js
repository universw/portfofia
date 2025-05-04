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

// DOM elements
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Submit message
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

// Load chat messages
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

// ===========================
// Firebase Authentication
// ===========================

// Login with Email/Password
function loginWithEmail() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => alert("Logged in as: " + userCred.user.email))
    .catch(err => alert(err.message));
}

// Sign up with Email/Password
function signUpWithEmail() {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => alert("Signed up as: " + userCred.user.email))
    .catch(err => alert(err.message));
}

// Login with Google
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("Google login: " + result.user.displayName))
    .catch(err => alert(err.message));
}

// Login with GitHub
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

// Show/Hide sections based on auth state
auth.onAuthStateChanged((user) => {
  const chatSection = document.getElementById("chatbox");
  const contactForm = document.getElementById("contact-form");
  const loginReminder = document.getElementById("login-reminder");

  if (user) {
    console.log("User logged in:", user.email || user.displayName);
    if (chatSection) chatSection.style.display = "block";
    if (contactForm) contactForm.style.display = "block";
    if (loginReminder) loginReminder.style.display = "none";
  } else {
    console.log("No user is logged in.");
    if (chatSection) chatSection.style.display = "none";
    if (contactForm) contactForm.style.display = "none";
    if (loginReminder) loginReminder.style.display = "block";
  }
});