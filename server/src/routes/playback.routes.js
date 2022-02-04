import { Router } from "express";
import { ... } from "../controllers/playbackController.js";
import upload from "../utils/multer.js";
import Auth from '../middlewares/index.js';

export const playbackRoutes = Router();

// ? GET PLAYBACK
playbackRoutes.get("/",  Auth.decodeToken, ...);

// ? CREATE PLAYBACK
playbackRoutes.post("/",  Auth.decodeToken, upload.single("..."), ...);

//? GET PLAYBACK BY ID
playbackRoutes.get("/:playbackId",  Auth.decodeToken, ...);

// //? UPDATE PLAYBACK BY ID
playbackRoutes.put("/:playbackId",  Auth.decodeToken, upload.single("..."), ...);

// //? DELETE PLAYBACK BY ID
playbackRoutes.delete("/:playbackId",  Auth.decodeToken, ...);