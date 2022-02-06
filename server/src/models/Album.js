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
  totalTracks: {
    type: Number,
  },
  tracks: {
    type: Schema.Types.ObjectId,
    ref: "tracks",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export default model("album", AlbumSchema);
