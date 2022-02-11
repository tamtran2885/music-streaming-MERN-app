import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
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
      type: String,
      // unique: true,
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
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
    // TODO ¿?¿?¿?¿?
    uploadedTracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "tracks",
      },
    ],
    followedBy: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          firebaseUser: String,
        },
      ],
    },
    favTrackList: {
      type: [
        {
          trackId: {
            type: Schema.Types.ObjectId,
            ref: "tracks",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default model("user", UserSchema);
