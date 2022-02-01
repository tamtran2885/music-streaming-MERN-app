import pkg from "mongoose";
const { Schema, model } = pkg;

const TracksSchema = new Schema({
    title:{
        type: String,
        //required: true,
        trim: true,
    },

    reproductions:{
        type: Number,
        trim: true,
    },

    album:{
        type: String,
        trim: true,
    },

    duration:{
        type: Number,
        trim: true,
    },

    user_id:{
        type: String,
        trim: true,
    },
    cloudinaryId: {
        type: String,
    },
    urlTrack: {
        type: String,
    },
});

export default model("Tracks", TracksSchema);