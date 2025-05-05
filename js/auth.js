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
  
  // Email Signup
  function signUpWithEmail() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => showNotification("Signed up as: " + userCred.user.email))
      .catch(err => showNotification("Signup failed: " + err.message));
  }
  
  // Email Login
  function loginWithEmail() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(userCred => showNotification("Logged in as: " + userCred.user.email))
      .catch(err => showNotification("Login failed: " + err.message));
  }
  
  // Google Login
  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("Google login: " + res.user.displayName))
      .catch(err => showNotification("Google login failed: " + err.message));
  }
  
  // GitHub Login
  function loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("GitHub login: " + res.user.displayName))
      .catch(err => showNotification("GitHub login failed: " + err.message));
  }
  
  // Facebook Login
  function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(res => showNotification("Facebook login: " + res.user.displayName))
      .catch(err => showNotification("Facebook login failed: " + err.message));
  }
  
  // Logout
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
  
  // Auth state UI changes
  auth.onAuthStateChanged(user => {
    const chatbox = document.getElementById("chatbox");
    const contact = document.getElementById("contact");
    const reminder = document.getElementById("login-reminder");
  
    if (user) {
      if (chatbox) chatbox.style.display = "block";
      if (contact) contact.style.display = "block";
      if (reminder) reminder.style.display = "none";
      showNotification("Welcome, " + (user.displayName || user.email));
    } else {
      if (chatbox) chatbox.style.display = "none";
      if (contact) contact.style.display = "none";
      if (reminder) reminder.style.display = "block";
    }
  });