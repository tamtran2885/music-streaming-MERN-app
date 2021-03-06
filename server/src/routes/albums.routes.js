import { Router } from "express";
import upload from "../utils/multer.js";

import {
  getAlbums,
  createAlbum,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumsByUser,
} from "../controllers/albumsController.js";

export const albumRoutes = Router();

//? GET ALBUMS By User - firebaseUser
//* @route GET api/albums/mine?firebaseUser= userId
albumRoutes.get("/mine", getAlbumsByUser);

//? GET ALBUM
//* @route GET api/albums
albumRoutes.get("/", getAlbums);

// ? CREATE ALBUM
albumRoutes.post("/", upload.single("thumbnail"), createAlbum);

//? GET ALBUM BY ID
albumRoutes.get("/:albumId", getAlbumById);

// //? UPDATE ALBUM BY ID
albumRoutes.put("/:albumId", upload.single("thumbnail"), updateAlbum);

// //? DELETE ALBUM BY ID
albumRoutes.delete("/:albumId", deleteAlbum);
