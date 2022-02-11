import pkg from "mongoose";
const { Schema, model } = pkg;

const PlaylistSchema = new Schema({
  title: {
    type: String,
  },

  collaborative: {
    type: Boolean,
    trim: true,
  },

  description: {
    type: String,
  },

  cover: {
    type: String,
  },

  thumbnail: {
    type: String,
  },

  cloudinaryId: {
    type: String,
  },

  publicAccessible: {
    type: Boolean,
  },

  numberSongs: {
    type: Number,
  },

  followers: {
    type: Number,
  },

  rating: {
    type: Number,
  },

  tracks: {
    type: [
      {
        trackId: String
      },
    ],
  },

  followedBy: {
    type: [
      {
        firebaseUser: String,
      },
    ],
  },

  firebaseUser: {
    type: String,
  },
});

export default model("playlist", PlaylistSchema);
