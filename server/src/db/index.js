import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.URI)
    .then(db => console.log("db is connected"))
    .catch(err => console.error("db is failure"))


export default mongoose;