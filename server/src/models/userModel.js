import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    passwords: {
        type: String,
        required: true,
        trim: true
    }
});

export default model('userModel', userSchema);