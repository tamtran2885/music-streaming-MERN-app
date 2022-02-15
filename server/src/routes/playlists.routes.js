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
//* @route GET api/playlists/getFollowing/:userId
playlistsRoutes.get("/getFollowing/:userId", getFollowingPlaylistsByUser);

//? GET PLAYLISTS By User - firebaseUser
//* @route GET api/playlists/mine
playlistsRoutes.get("/mine", getPlaylistsByUser);

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS
//* @route GET api/playlists/detailsUser/:playlistId
playlistsRoutes.get("/detailsUser/:playlistId", getPlaylistByIdAndInfo);

//? GET PLAYLISTS
//* @route GET api/playlists
playlistsRoutes.get("/", getPlaylists);

//? CREATE PLAYLIST
//* @route POST api/playlists
playlistsRoutes.post("/", upload.single("thumbnail"), createPlaylist);

//? GET PLAYLIST BY ID
//* @route GET api/playlists/:playlistId
playlistsRoutes.get("/:playlistId", getPlaylistById);

//? UPDATE PLAYLIST BY ID
//* @route PUT api/playlists/edit/:playlistId
playlistsRoutes.put(
  "/edit/:playlistId",

  upload.single("thumbnail"),
  updatePlaylistById
);

//? DELETE PLAYLIST
//* @route DELETE api/playlists/:playlistId
playlistsRoutes.delete("/:playlistId", deletePlaylistById);

//? FOLLOW PLAYLIST
//* @route DELETE api/playlists/follow/:playlistId
playlistsRoutes.put("/follow/:playlistId", followPlaylist);

//? UNFOLLOW PLAYLIST
//* @route DELETE api/playlists/unfollow/:playlistId
playlistsRoutes.put("/unfollow/:playlistId", unfollowPlaylist);

//? GET PLAYLIST BY ID AND SHOW TRACKS DETAILS
//* @route GET api/playlists/details/:playlistId
playlistsRoutes.get("/details/:playlistId", getPlaylistByIdAndDetails);

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS
//* @route GET api/playlists/detailsUser/:playlistId
playlistsRoutes.get("/detailsUser/:playlistId", getPlaylistByIdAndInfo);
