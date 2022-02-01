import { Router } from "express";

import { getTracks, createTrack } from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";

export const tracksRoutes = Router();

// ? GET USERS

tracksRoutes.get("/", getTracks);

// ? CREATE tracks

tracksRoutes.post("/", uploadTrack.single("fileTrack"), createTrack);

// //? GET tracks BY ID
// tracksRoutes.get("/:tracksId", getTracksById);

// // //? UPDATE tracks BY ID
// tracksRoutes.put("/:tracksId", upload.single("profile"), updateTracks);

// // //? DELETE tracks BY ID
// tracksRoutes.delete("/:tracksId", deleteTracks);