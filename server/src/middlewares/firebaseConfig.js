import admin from "firebase-admin";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(
    {
      "projectId": process.env.FIREBASE_PROJECT_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }
  ),
});

export default admin;