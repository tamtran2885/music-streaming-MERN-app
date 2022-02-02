import pkg from "mongoose";
const { Schema, model } = pkg;

const TracksSchema = new Schema({


    title: {
        type: String,
        //required: true,
        trim: true,
    },

    reproductions: {
        type: Number,
        trim: true,
    },

    album: {
        type: String,
        trim: true,
    },

    duration: {
        type: Number,
        trim: true,
    },
    cloudinaryId: {
        type: String,
    },
    urlTrack: {
        type: String,
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
});

export default model("Tracks", TracksSchema);