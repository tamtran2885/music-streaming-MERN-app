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
      addTrackToPlaylist,
      followPlaylist,
      unfollowPlaylist
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
playlistsRoutes.put("/:playlistId", upload.single("thumbnail"), updatePlaylistById);

//? UPDATE PLAYLIST BY ID
playlistsRoutes.put("/addTrackToPlaylist/:playlistId", upload.single("thumbnail"), addTrackToPlaylist);

//? DELETE PLAYLIST BY ID
playlistsRoutes.delete("/:playlistId", deletePlaylistById);

//? FOLLOW PLAYLIST
playlistsRoutes.put("/follow/:playlistId", followPlaylist);

//? UNFOLLOW PLAYLIST
playlistsRoutes.put("/unfollow/:playlistId", unfollowPlaylist);

