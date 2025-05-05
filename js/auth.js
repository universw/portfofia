// Firebase Auth Providers
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// === EMAIL SIGNUP ===
function signUpWithEmail() {
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Signup successful", userCredential.user);
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
    });
}

// === EMAIL LOGIN ===
function loginWithEmail() {
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login successful", userCredential.user);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
}

// === GOOGLE LOGIN ===
function loginWithGoogle() {
  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      console.log("Google login successful", result.user);
    })
    .catch((error) => {
      console.error("Google login error:", error.message);
    });
}

// === GITHUB LOGIN ===
function loginWithGithub() {
  firebase.auth().signInWithPopup(githubProvider)
    .then((result) => {
      console.log("GitHub login successful", result.user);
    })
    .catch((error) => {
      console.error("GitHub login error:", error.message);
    });
}

// === FACEBOOK LOGIN ===
function loginWithFacebook() {
  firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
      console.log("Facebook login successful", result.user);
    })
    .catch((error) => {
      console.error("Facebook login error:", error.message);
    });
}

// === LOGOUT ===
function userLogout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
}

// === CHECK USER STATUS ===
firebase.auth().onAuthStateChanged((user) => {
  const chatbox = document.getElementById('chatbox');
  const contact = document.getElementById('contact');
  const reminder = document.getElementById('login-reminder');

  if (user) {
    // User is logged in
    if (chatbox) chatbox.style.display = 'block';
    if (contact) contact.style.display = 'block';
    if (reminder) reminder.style.display = 'none';
  } else {
    // User is logged out
    if (chatbox) chatbox.style.display = 'none';
    if (contact) contact.style.display = 'none';
    if (reminder) reminder.style.display = 'block';
  }
});