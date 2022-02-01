var admin = require("firebase-admin");

const serviceAccount = require("./serviceAccounts.json");

admin.initializeApp({

credential: admin.credential.cert(serviceAccount)

});

module.exports = admin