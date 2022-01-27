import express from "express";
import config from "./config/config.js";
import morgan from "morgan";
import cors from "cors";

import { usersRoutes } from "./routes/login.routes.js";

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

app.use("/api/users", usersRoutes);

//?static files

//app.use(express.static(path.join(__dirname, 'public')));

//? THIS WAS FIRST port

export default app;
