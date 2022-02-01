import { Router } from "express";

import { getTracks, createTrack, getTrackById, deleteTrack, updateTrack } from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";

export const tracksRoutes = Router();

// ? GET USERS

tracksRoutes.get("/", getTracks);

// ? CREATE tracks

tracksRoutes.post("/", uploadTrack.single("fileTrack"), createTrack);

// ? GET tracks BY ID
tracksRoutes.get("/:trackId", getTrackById);

// ? UPDATE tracks BY ID
tracksRoutes.put("/edit/:trackId", uploadTrack.single("fileTrackUpdate"), updateTrack);

// ? DELETE tracks BY ID
tracksRoutes.delete("/:trackId", deleteTrack);