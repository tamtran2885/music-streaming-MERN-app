import app from "./server.js";
import config from "./config/config.js";
import connect from "./db/connect.js";
import "dotenv/config";

connect().then(async function onServer() {
  console.log(`DB connected`);

  app.listen(config.app.PORT, () => {
    console.log(`Server running at PORT:${config.app.PORT}`);
  });
});
