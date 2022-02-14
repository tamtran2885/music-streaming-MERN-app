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
  getPlaylistByIdAndInfo
} from "../controllers/playlistsController.js";
import middleware from "../middlewares/index.js";


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
playlistsRoutes.put(
  "/edit/:playlistId",
  upload.single("thumbnail"),
  updatePlaylistById
);

//? DELETE PLAYLIST BY ID
playlistsRoutes.delete("/:playlistId", deletePlaylistById);

//? FOLLOW PLAYLIST
playlistsRoutes.put("/follow/:playlistId", followPlaylist);

//? UNFOLLOW PLAYLIST
playlistsRoutes.put("/unfollow/:playlistId", unfollowPlaylist);

//? GET PLAYLIST BY ID AND SHOW TRACKS DETAILS
playlistsRoutes.get("/details/:playlistId", getPlaylistByIdAndDetails);

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS

playlistsRoutes.get("/detailsUser/:playlistId", getPlaylistByIdAndInfo);