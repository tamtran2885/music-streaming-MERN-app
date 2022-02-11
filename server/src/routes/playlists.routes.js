import { Router } from "express";
import upload from "../utils/multer.js";
import Auth from "../middlewares/index.js";
import {
  createPlaylist,
  deletePlaylistById,
  getPlaylistById,
  getPlaylists,
  updatePlaylistById,
  getPlaylistsByUser,
  followPlaylist,
  unfollowPlaylist,
  getPlaylistByIdAndDetails,
} from "../controllers/playlistsController.js";

export const playlistsRoutes = Router();

//? GET PLAYLISTS By User - firebaseUser
playlistsRoutes.get("/mine", getPlaylistsByUser);

// ? GET PLAYLIST
playlistsRoutes.get("/", getPlaylists);

// ? CREATE PLAYLIST
playlistsRoutes.post("/", upload.single("thumbnail"), createPlaylist);

//? GET PLAYLIST BY ID
playlistsRoutes.get("/:playlistId", getPlaylistById);

//? UPDATE PLAYLIST BY ID
playlistsRoutes.put("/:playlistId", updatePlaylistById);

//? ADD TRACK TO PLAYLIST
// playlistsRoutes.put("/addTrackToPlaylist/:playlistId", addTrackToPlaylist);

//? DELETE PLAYLIST BY ID
playlistsRoutes.delete("/:playlistId", deletePlaylistById);

//? DELETE TRACK IN PLAYLIST
// playlistsRoutes.delete("/deleteTrack/:playlistId", deleteTrackInPlaylist);

//? FOLLOW PLAYLIST
playlistsRoutes.put("/follow/:playlistId", followPlaylist);

//? UNFOLLOW PLAYLIST
playlistsRoutes.put("/unfollow/:playlistId", unfollowPlaylist);

//? GET PLAYLIST DETAILS BY TRACK ID AND SHOW TRACKS DETAILS
playlistsRoutes.get("/details/:playlistId", getPlaylistByIdAndDetails);
