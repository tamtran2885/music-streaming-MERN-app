import { Router } from "express";
import upload from "../utils/multer.js";
import Auth from '../middlewares/index.js';

export const albumRoutes = Router();

// // ? GET ALBUM
// albumRoutes.get("/", Auth.decodeToken, ...);

// // ? CREATE ALBUM
// albumRoutes.post("/", Auth.decodeToken, upload.single("..."), ...);

// //? GET ALBUM BY ID
// albumRoutes.get("/:albumId", Auth.decodeToken, ...);

// // //? UPDATE ALBUM BY ID
// albumRoutes.put("/:albumId", Auth.decodeToken, upload.single("..."), ...);

// // //? DELETE ALBUM BY ID
// albumRoutes.delete("/:albumId", Auth.decodeToken, ...);

