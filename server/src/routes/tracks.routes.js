import { Router } from "express";
import {
  getTracks,
  createTrack,
  getTrackById,
  deleteTrack,
  updateTrack,
} from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";
import upload from "../utils/multer.js";

export const tracksRoutes = Router();

// ? GET TRACKS
tracksRoutes.get("/", getTracks);

// ? CREATE tracks
tracksRoutes.post("/", uploadTrack.single("urlTrack"), createTrack);

// ? GET tracks BY ID
tracksRoutes.get("/:trackId", getTrackById);

// ? UPDATE tracks BY ID
tracksRoutes.put(
  "/edit/:trackId",
  uploadTrack.single("fileTrackUpdate"),
  updateTrack
);

// ? DELETE tracks BY ID
tracksRoutes.delete("/:trackId", deleteTrack);
