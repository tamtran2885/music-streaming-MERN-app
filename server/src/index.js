import express from 'express';

const app = express();

//?port

app.listen(4000, () => {
    console.log("Server listening on port 4000");
});