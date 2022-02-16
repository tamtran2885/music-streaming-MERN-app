import pkg from "mongoose";
const { Schema, model } = pkg;

const AlbumSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  totalTracks: {
    type: Number,
  },
  tracks: {
    type: [
      {
        trackId: String,
      },
    ],
  },
  firebaseUser: {
    type: String,
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export default model("album", AlbumSchema);
