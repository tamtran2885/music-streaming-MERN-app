import express from "express";
import config from "./config/config.js";
import morgan from "morgan";
import cors from "cors";

import { userRoutes } from "./routes/user.routes.js";
import { tracksRoutes } from "./routes/tracks.routes.js";

const app = express();

//?settings

//?middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: config.client.URL,
  })
);

//?routes

app.use("/api/user", userRoutes);

app.use("/api/tracks", tracksRoutes);

export default app;