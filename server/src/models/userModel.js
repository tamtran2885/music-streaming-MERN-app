// import { Schema, model } from 'mongoose';
import pkg from "mongoose";
const { Schema, model } = pkg;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  passwords: {
    type: String,
    required: true,
    trim: true,
  },
});

export default model("userModel", userSchema);
