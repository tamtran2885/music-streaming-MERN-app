import { Router } from "express";
import { ... } from "../controllers/playlistController.js";
import upload from "../utils/multer.js";
import Auth from '../middlewares/index.js';

export const playlistRoutes = Router();

// ? GET PLAYLIST
playlistRoutes.get("/",  Auth.decodeToken, ...);

// ? CREATE PLAYLIST
playlistRoutes.post("/",  Auth.decodeToken, upload.single("..."), ...);

//? GET PLAYLIST BY ID
playlistRoutes.get("/:playlistId",  Auth.decodeToken, ...);

// //? UPDATE PLAYLIST BY ID
playlistRoutes.put("/:playlistId",  Auth.decodeToken, upload.single("..."), ...);

// //? DELETE PLAYLIST BY ID
playlistRoutes.delete("/:playlistId",  Auth.decodeToken, ...);