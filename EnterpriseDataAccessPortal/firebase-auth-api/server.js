const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const authorize = require("./middleware/authorize");
const path = require("path");

const serviceAccount = require(path.resolve(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const userRef = db.collection("users").doc(decoded.uid);
    const userSnap = await userRef.get();

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: userSnap.exists ? userSnap.data().role : "guest",
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});

app.get("/", (req, res) => {
  res.send("Firebase Auth API is running");
});

app.get("/api/data", authorize("view_data"), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}! You have access to view data.` });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
