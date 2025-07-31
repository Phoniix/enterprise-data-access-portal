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
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      // redirect or show dashboard here
    })
    .catch((error) => {
      alert(error.message);
    });
}

function resetPassword() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email to reset password.");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert(error.message);
    });
}
