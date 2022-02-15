import { Router } from "express";
import {
  LogIn,
  getUsers,
  createUser,
  getUserById,
  deleteTheUser,
  updateUser,
  changePass,
  followUser,
  unfollowUser,
  createUserGoogle
} from "../controllers/userController.js";
import upload from "../utils/multer.js";
import middleware from "../middlewares/index.js"

export const userRoutes = Router();


// ? GET USERS
userRoutes.get("/", middleware.decodeToken, getUsers);

userRoutes.post("/loggedIn", middleware.decodeToken, LogIn);

// ? CREATE USER
userRoutes.post("/", upload.single("profile"), middleware.decodeToken, createUser);

// ? CREATE USER GOOGLE
userRoutes.post("/google", createUserGoogle);

//? GET USER BY ID
userRoutes.get("/:userId", middleware.decodeToken, getUserById);

//? UPDATE USER BY ID
userRoutes.put("/:userId", upload.single("profile"), middleware.decodeToken, updateUser);

//? UPDATE USER PASSWORD BY ID

userRoutes.put("/change-password/:userId", middleware.decodeToken, changePass);

//? DELETE USER BY ID
userRoutes.delete("/:userId", middleware.decodeToken, deleteTheUser);

//? FOLLOW USER

userRoutes.put("/follow/:userId", middleware.decodeToken, followUser);

//? UNFOLLOW USER

userRoutes.put("/unfollow/:userId", middleware.decodeToken, unfollowUser);