import admin from "firebase-admin";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

export default admin;
