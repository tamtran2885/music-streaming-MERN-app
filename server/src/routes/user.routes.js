import { Router } from "express";
import { getUsers, createUser, getUserById } from "../controllers/userController.js";

export const userRoutes = Router();

// ? GET USERS

userRoutes.get("/", getUsers);

// ? CREATE USER

userRoutes.post("/", createUser);

//? GET USER BY ID
userRoutes.get("/:userId", getUserById);

// //? UPDATE USER BY ID
// userRoutes.put("/:userId" , updateUser);

// //? DELETE USER BY ID
// userRoutes.delete("/:userId", deleteUser);