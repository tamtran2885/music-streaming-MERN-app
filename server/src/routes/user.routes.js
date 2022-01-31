import { Router } from "express";
import {
      getUsers,
      createUser,
      getUserById,
      deleteUser,
      updateUser,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";


export const userRoutes = Router();

// ? GET USERS

userRoutes.get("/", getUsers);

// ? CREATE USER

userRoutes.post("/", upload.single("profile"), createUser);

//? GET USER BY ID
userRoutes.get("/:userId", getUserById);

// //? UPDATE USER BY ID
userRoutes.put("/:userId", upload.single("profile"), updateUser);

// //? DELETE USER BY ID
userRoutes.delete("/:userId", deleteUser);
