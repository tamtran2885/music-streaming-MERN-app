// import { Schema, model } from 'mongoose';
import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema({
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
  birthday: {
    type: Date,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  profile: {
    type: Object,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firebaseUser: {
    type: Object
  },
});

export default model("User", UserSchema);
