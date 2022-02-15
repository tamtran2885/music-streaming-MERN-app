import { Router } from "express";
import upload from "../utils/multer.js";

import {
      getAlbums,
      createAlbum,
      getAlbumById,
      updateAlbum,
      deleteAlbum
} from "../controllers/albumsController.js"
import middleware from "../middlewares/index.js";


export const albumRoutes = Router();

// ? GET ALBUM
albumRoutes.get("/", middleware.decodeToken, getAlbums);

// ? CREATE ALBUM
albumRoutes.post("/", middleware.decodeToken, upload.single("thumbnail"), createAlbum);

//? GET ALBUM BY ID
albumRoutes.get("/:albumId", middleware.decodeToken, getAlbumById);

// //? UPDATE ALBUM BY ID
albumRoutes.put("/:albumId", middleware.decodeToken, upload.single("thumbnail"), updateAlbum);

// //? DELETE ALBUM BY ID
albumRoutes.delete("/:albumId", middleware.decodeToken, deleteAlbum);

