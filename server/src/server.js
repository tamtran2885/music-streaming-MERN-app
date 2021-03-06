import express from "express";
import config from "./config/config.js";
import morgan from "morgan";
import cors from "cors";

import { userRoutes } from "./routes/user.routes.js";
import { tracksRoutes } from "./routes/tracks.routes.js";
import { playlistsRoutes } from "./routes/playlists.routes.js";
import { albumRoutes } from "./routes/albums.routes.js";
import middleware from "./middlewares/index.js";

const app = express();

//?settings

//?middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);


// ! MIDDLEWARE WORKING WHEN HE WANTS
//app.use(middleware.decodeToken);

//?routes

app.use("/api/user", userRoutes);

app.use("/api/tracks", tracksRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/albums", albumRoutes);

export default app;
