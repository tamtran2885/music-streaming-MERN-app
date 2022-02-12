import pkg from "mongoose";
const { Schema, model } = pkg;

const TracksSchema = new Schema(
  {
    title: {
      type: String,
      //required: true,
      trim: true,
    },
    reproductions: {
      type: Number,
      trim: true,
    },
    artist: {
      type: String,
      trim: true,
    },
    album: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      trim: true,
    },
    photoTrack: {
      type: String,
    },
    thumbId: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
    urlTrack: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    firebaseUser: {
      type: String,
    },
    likes: {
      type: [
        {
          firebaseUser: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default model("tracks", TracksSchema);
