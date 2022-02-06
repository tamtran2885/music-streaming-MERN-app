import { Router } from "express";
import { ... } from "../controllers/genreController.js";
import upload from "../utils/multer.js";
import Auth from '../middlewares/index.js';

export const genreRoutes = Router();

// ? GET GENRE
genreRoutes.get("/",  Auth.decodeToken, ...);

// ? CREATE GENRE
genreRoutes.post("/",  Auth.decodeToken, upload.single("..."), ...);

//? GET GENRE BY ID
genreRoutes.get("/:genreId",  Auth.decodeToken, ...);

// //? UPDATE GENRE BY ID
genreRoutes.put("/:genreId",  Auth.decodeToken, upload.single("..."), ...);

// //? DELETE GENRE BY ID
genreRoutes.delete("/:genreId",  Auth.decodeToken, ...);