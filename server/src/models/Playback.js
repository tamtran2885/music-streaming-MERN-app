import pkg from "mongoose";
const { Schema, model } = pkg;

const PlaybackSchema = new Schema({

    ip: {
        type: String,
    },

    latitude: {
        type: Double,
    },
	
	longitude: {
		type: Bouble,
	},
	
	agent: {
		type: AgentType
	},

    date: {
        type: ZondeDateTime
    },
	
	track: {
		type: Schema.Types.ObjectId,
        ref: "tracks"
	}
});

export default model("playBack", PlaybackSchema);