const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => userCredential.user.getIdToken())
    .then(token => {
      return fetch("http://localhost:3000/api/data", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    })
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data);
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      console.error("Login/API Error:", error);
      alert("Login failed or unauthorized.");
    });
}
