import { Router } from "express";
import { getTracks, createTrack, getTrackById, deleteTrack, updateTrack } from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";
import Auth from '../middlewares/index.js';

export const tracksRoutes = Router();

// ? GET USERS
tracksRoutes.get("/",  Auth.decodeToken, getTracks);

// ? CREATE tracks
tracksRoutes.post("/", Auth.decodeToken, uploadTrack.single("fileTrack"), createTrack);

// ? GET tracks BY ID
tracksRoutes.get("/:trackId",  Auth.decodeToken, getTrackById);

// ? UPDATE tracks BY ID
tracksRoutes.put("/edit/:trackId",  Auth.decodeToken, uploadTrack.single("fileTrackUpdate"), updateTrack);

// ? DELETE tracks BY ID
tracksRoutes.delete("/:trackId",  Auth.decodeToken, deleteTrack);