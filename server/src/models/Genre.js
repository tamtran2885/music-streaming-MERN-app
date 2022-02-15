import pkg from "mongoose";
const { Schema, model } = pkg;

const GenreSchema = new Schema({
    name: {
        type: String,
    },
    popularity: {
        type: Integer,
    }
});

export default model("genre", GenreSchema);