import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";
import Auth from "../middlewares/index.js";

export const userRoutes = Router();

// ? GET USERS
userRoutes.get("/", Auth.decodeToken, getUsers);

// ? CREATE USER
userRoutes.post("/", upload.single("profile"), createUser);

//? GET USER BY ID
userRoutes.get("/:userId", Auth.decodeToken, getUserById);

// //? UPDATE USER BY ID
userRoutes.put(
  "/:userId",
  Auth.decodeToken,
  upload.single("profile"),
  updateUser
);

// //? DELETE USER BY ID
userRoutes.delete("/:userId", Auth.decodeToken, deleteUser);
