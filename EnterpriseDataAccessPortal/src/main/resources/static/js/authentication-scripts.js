// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh4BFKdvlBB8zanunGXVWYo7Azvy47RsI",
  authDomain: "devops-auth-demo.firebaseapp.com",
  projectId: "devops-auth-demo",
  storageBucket: "devops-auth-demo.appspot.com",
  messagingSenderId: "684737269225",
  appId: "1:684737269225:web:c9b4cb838d5cabf5884f78",
  measurementId: "G-KTLQDZDZD3"
};

firebase.initializeApp(firebaseConfig);

// Login function
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      console.error("Login Error:", error);
      alert("Unable to sign in. Please check your email and password and try again.");
    });
}

// Password reset
function resetPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter your email address to receive a password reset link.");
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("A password reset email has been sent. Please check your inbox.");
    })
    .catch(error => {
      console.error("Password Reset Error:", error);
      alert("We couldn't send the reset email. Please make sure the address is correct or try again later.");
    });
}

// Logout
function logout() {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Logout Error:", error);
      alert("We encountered a problem while signing out. Please try again.");
    });
}