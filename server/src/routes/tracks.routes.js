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
  reproductionsCounter,
  trackToAlbum,
  getTracksBySearch,
} from "../controllers/tracksController.js";
import uploadTrack from "../utils/multerTracks.js";
import upload from "../utils/multer.js";
import middleware from "../middlewares/index.js"

export const tracksRoutes = Router();

// get Tracks By Search
tracksRoutes.get("/search", middleware.decodeToken, getTracksBySearch);

// GET Tracks By User - firebaseUser
tracksRoutes.get("/mine", middleware.decodeToken, getTracksByUser);



// Add Fav to a track
// @route PUT api/tracks/like/:trackId
tracksRoutes.put("/like/:trackId", addFavToTrack);

// Remove Fav from a track
// @route PUT api/tracks/unlike/:trackId
tracksRoutes.put("/unlike/:trackId", removeFavFromTrack);

// Add track to playlist
// @route PUT api/tracks/addToPlaylist/:trackId
tracksRoutes.put("/addToPlaylist/:trackId", middleware.decodeToken,
  addTrackToPlaylist);

// Remove track from playlist
// @route PUT api/tracks/deleteFromPlaylist/:trackId
tracksRoutes.put("/deleteFromPlaylist/:trackId", middleware.decodeToken, deleteTrackFromPlaylist);

//? UPDATE REPRODUCTION COUNTER
tracksRoutes.put("/reproducing/:trackId", reproductionsCounter);

// ? GET Tracks By User - firebaseUser
tracksRoutes.get("/likedByUser/:userId", middleware.decodeToken, getTrackDetailsInFav);

// ? GET TRACKS
tracksRoutes.get("/", middleware.decodeToken,
  getTracks);

// ? CREATE tracks
tracksRoutes.post("/", middleware.decodeToken,
  uploadTrack.single("urlTrack"), createTrack);

// ? UPLOAD THUMBNAIL TO TRACK
tracksRoutes.put(
  "/uploadThumbnail/:trackId",
  middleware.decodeToken,
  upload.single("photoTrack"),
  addPhotoToTrack
);

// ? GET tracks BY ID
tracksRoutes.get("/:trackId", middleware.decodeToken, getTrackById);

// ? UPDATE tracks BY ID
tracksRoutes.put(
  "/edit/:trackId",
  middleware.decodeToken,
  uploadTrack.single("fileTrackUpdate"),
  updateTrack
);

// ? DELETE tracks BY ID
tracksRoutes.delete("/:trackId", middleware.decodeToken,
  deleteTrack);

// ? ADD TRACK TO ALBUM
tracksRoutes.put("/addToAlbum/:trackId", middleware.decodeToken,
  trackToAlbum);
