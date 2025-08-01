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
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userDoc.exists ? userDoc.data().role : "guest",
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

app.get("/api/data", authorize("view_data"), (req, res) => {
  res.json({ message: "You can view data!" });
});

app.post("/api/upload", authorize("upload_files"), (req, res) => {
  res.json({ message: "Upload successful!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
