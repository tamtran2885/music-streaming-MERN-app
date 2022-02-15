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
  getPlaylistByIdAndInfo,
  getFollowingPlaylistsByUser,
} from "../controllers/playlistsController.js";
import middleware from "../middlewares/index.js";

export const playlistsRoutes = Router();

//? GET FOLLOWING PLAYLISTS BY USER
playlistsRoutes.get("/getFollowing/:userId", getFollowingPlaylistsByUser);

//? GET PLAYLISTS By User - firebaseUser
playlistsRoutes.get("/mine", middleware.decodeToken, getPlaylistsByUser);

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS
playlistsRoutes.get("/detailsUser/:playlistId", middleware.decodeToken, getPlaylistByIdAndInfo);

// ? GET PLAYLIST
playlistsRoutes.get("/", middleware.decodeToken, getPlaylists);

// ? CREATE PLAYLIST
playlistsRoutes.post("/", middleware.decodeToken, upload.single("thumbnail"), createPlaylist);

//? GET PLAYLIST BY ID
playlistsRoutes.get("/:playlistId", middleware.decodeToken, getPlaylistById);

//? UPDATE PLAYLIST BY ID
playlistsRoutes.put(
  "/edit/:playlistId",
  middleware.decodeToken,
  upload.single("thumbnail"),
  updatePlaylistById
);

//? DELETE PLAYLIST BY ID
playlistsRoutes.delete("/:playlistId", middleware.decodeToken, deletePlaylistById);

//? FOLLOW PLAYLIST
playlistsRoutes.put("/follow/:playlistId", middleware.decodeToken, followPlaylist);

//? UNFOLLOW PLAYLIST
playlistsRoutes.put("/unfollow/:playlistId", middleware.decodeToken, unfollowPlaylist);

//? GET PLAYLIST BY ID AND SHOW TRACKS DETAILS
playlistsRoutes.get("/details/:playlistId", middleware.decodeToken, getPlaylistByIdAndDetails);

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS
playlistsRoutes.get("/detailsUser/:playlistId", middleware.decodeToken, getPlaylistByIdAndInfo);

//? GET FOLLOWED PLAYLIST BY USERS
playlistsRoutes.get("/detailsUser/:userId", middleware.decodeToken, getFollowingPlaylistsByUser);
