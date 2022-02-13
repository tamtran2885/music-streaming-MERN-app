import { Router } from "express";
import {
  getTracks,
  createTrack,
  getTrackById,
  deleteTrack,
  updateTrack,
  getTracksByUser,
  addFavToTrack,
  removeFavFromTrack,
  addTrackToPlaylist,
  deleteTrackFromPlaylist,
  getTrackDetailsInFav,
  addPhotoToTrack,
  reproductionsCounter
} from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";
import upload from "../utils/multer.js";
import middleware from "../middlewares/index.js"


export const tracksRoutes = Router();

// GET Tracks By User - firebaseUser
tracksRoutes.get("/mine", getTracksByUser);

// Add Fav to a track
// @route PUT api/tracks/like/:trackId
tracksRoutes.put("/like/:trackId", addFavToTrack);

// Remove Fav from a track
// @route PUT api/tracks/unlike/:trackId
tracksRoutes.put("/unlike/:trackId", removeFavFromTrack);

// Add track to playlist
// @route PUT api/tracks/addToPlaylist/:trackId
tracksRoutes.put("/addToPlaylist/:trackId", addTrackToPlaylist);

// Remove track from playlist
// @route PUT api/tracks/deleteFromPlaylist/:trackId
tracksRoutes.put("/deleteFromPlaylist/:trackId", deleteTrackFromPlaylist);

//? UPDATE REPRODUCTION COUNTER
tracksRoutes.put("/reproducing/:trackId", reproductionsCounter)

// ? GET Tracks By User - firebaseUser
tracksRoutes.get("/likedByUser/:userId", getTrackDetailsInFav);

// ? GET TRACKS
tracksRoutes.get("/", getTracks);

// ? CREATE tracks
tracksRoutes.post("/", uploadTrack.single("urlTrack"), createTrack);

// ? UPLOAD THUMBNAIL TO TRACK
tracksRoutes.put(
  "/uploadThumbnail/:trackId",
  upload.single("photoTrack"),
  addPhotoToTrack
);

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
