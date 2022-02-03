import mongoose from "mongoose";
import config from "../config/config.js";

function connect() {
  return mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connect;
