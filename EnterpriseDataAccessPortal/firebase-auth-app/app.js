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
      alert("Login failed: " + error.message);
    });
}

// Password reset
function resetPassword() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent.");
    })
    .catch(error => {
      console.error("Password Reset Error:", error);
      alert("Error: " + error.message);
    });
}

// Logout
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
}
