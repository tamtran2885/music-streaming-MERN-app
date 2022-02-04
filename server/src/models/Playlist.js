import pkg from "mongoose";
const { Schema, model } = pkg;

const PlaylistSchema = new Schema({

    title: {
        type: String,
    },

    cooaborative: {
        type: Boolean,
        trim: true,
    },
	
	description: {
		type: TextBlob,
	},
	
	primaryColor: {
		type: String
	},
	
	cover: {
		type:String
	},
	
	thumbnail: {
		type:String
	},
	
	publicAccessible: {
		type: Boolean
	},
	
	numberSongs: {
		type: Integer
	},
	
	followers: {
		type: Integer
	},
	
	rating: {
		type: Double
	},
	
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},

    tracks: {
        type: Schema.Types.ObjectId,
        ref: "tracks"
    },
	
	fllowedBy: {
		type: Schema.Types.ObjectId,
        ref: "user"
	}
	
});

export default model("playlist", PlaylistSchema);