// Toast-style notification
function showNotification(message, duration = 3000) {
    const box = document.getElementById("notification");
    if (!box) return;
    box.textContent = message;
    box.classList.add("show");
    setTimeout(() => {
      box.classList.remove("show");
    }, duration);
  }
  
  const auth = firebase.auth();
  
  // === AUTH FUNCTIONS ===
  
  function signUpWithEmail() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => showNotification("Signed up: " + userCred.user.email))
      .catch(err => showNotification("Signup failed: " + err.message));
  }
  
  function loginWithEmail() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(userCred => showNotification("Logged in: " + userCred.user.email))
      .catch(err => showNotification("Login failed: " + err.message));
  }
  
  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("Google login: " + res.user.displayName))
      .catch(err => showNotification("Google login failed: " + err.message));
  }
  
  function loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("GitHub login: " + res.user.displayName))
      .catch(err => showNotification("GitHub login failed: " + err.message));
  }
  
  function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("Facebook login: " + res.user.displayName))
      .catch(err => showNotification("Facebook login failed: " + err.message));
  }
  
  function userLogout() {
    auth.signOut()
      .then(() => showNotification("Logged out"))
      .catch(err => showNotification("Logout failed: " + err.message));
  }
  
  // Expose to HTML
  window.signUpWithEmail = signUpWithEmail;
  window.loginWithEmail = loginWithEmail;
  window.loginWithGoogle = loginWithGoogle;
  window.loginWithGithub = loginWithGithub;
  window.loginWithFacebook = loginWithFacebook;
  window.userLogout = userLogout;
  
  // Auth state UI updates
  auth.onAuthStateChanged(user => {
    const chatbox = document.getElementById("chatbox");
    const contact = document.getElementById("contact");
    const reminder = document.getElementById("login-reminder");
  
    if (user) {
      if (chatbox) chatbox.style.display = "block";
      if (contact) contact.style.display = "block";
      if (reminder) reminder.style.display = "none";
    } else {
      if (chatbox) chatbox.style.display = "none";
      if (contact) contact.style.display = "none";
      if (reminder) reminder.style.display = "block";
    }
  });