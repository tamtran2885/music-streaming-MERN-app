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
    thumbnail: {
		type: String,
	},
    thumbnailId: {
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
        ref: "user"
    },
});

export default model("tracks", TracksSchema);