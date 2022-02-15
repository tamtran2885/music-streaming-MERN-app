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


export const tracksRoutes = Router();

//? GET TRACKS BY SEARCH
//* @route PUT api/tracks/search
tracksRoutes.get("/search", getTracksBySearch);

//? GET TRACKS BY USER - FIREBASE USER
//* @route PUT api/tracks/mine
tracksRoutes.get("/mine", getTracksByUser);

//? ADD FAV TO TRACK
//* @route PUT api/tracks/like/:trackId
tracksRoutes.put("/like/:trackId", addFavToTrack);

//? REMOVE FAV FROM A TRACK
//* @route PUT api/tracks/unlike/:trackId
tracksRoutes.put("/unlike/:trackId", removeFavFromTrack);

//? ADD TRACK TO TPLAYLIST 
//* @route PUT api/tracks/addToPlaylist/:trackId
tracksRoutes.put("/addToPlaylist/:trackId", addTrackToPlaylist);

//? REMOVE A TRACK FROM PLAYLIST
//* @route PUT api/tracks/deleteFromPlaylist/:trackId
tracksRoutes.put("/deleteFromPlaylist/:trackId", deleteTrackFromPlaylist);

//? UPDATE REPRODUCTION COUNTER
//* @route PUT api/tracks/reproducing/:trackId
tracksRoutes.put("/reproducing/:trackId", reproductionsCounter);

//? GET TRACKS BY USER - FIREBASE USER 
//* @route PUT api/tracks/likedByUser/:userId
tracksRoutes.get("/likedByUser/:userId", getTrackDetailsInFav);

//? GET TRACKS
//* @route PUT api/tracks
tracksRoutes.get("/", getTracks);

//? CREATE tracks
//* @route PUT api/tracks
tracksRoutes.post("/", uploadTrack.single("urlTrack"), createTrack);

//? UPLOAD THUMBNAIL TO TRACK
//* @route PUT api/tracks/uploadThumbnail/:trackId
tracksRoutes.put(
  "/uploadThumbnail/:trackId",

  upload.single("photoTrack"),
  addPhotoToTrack
);

//? GET TRACKS BY ID
//* @route PUT api/tracks/:trackId
tracksRoutes.get("/:trackId", getTrackById);

//? UPDATE trackTRACKS BY ID
//* @route PUT api/tracks/edit/:trackId
tracksRoutes.put(
  "/edit/:trackId",

  uploadTrack.single("fileTrackUpdate"),
  updateTrack
);

//? DELETE trackTRACKS BY ID
//* @route PUT api/tracks/:trackId
tracksRoutes.delete("/:trackId", deleteTrack);

//? ADD TRACK TO ALBUM
//* @route PUT api/tracks/addToAlbum/:trackId
tracksRoutes.put("/addToAlbum/:trackId", trackToAlbum);
