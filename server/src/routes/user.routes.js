import { Router } from "express";
import {
  LogIn,
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  changePass,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";
import middleware from "../middlewares/index.js"

export const userRoutes = Router();


// ? GET USERS
userRoutes.get("/", middleware.decodeToken, getUsers);

userRoutes.post("/loggedIn", middleware.decodeToken, LogIn);

// ? CREATE USER
userRoutes.post("/", middleware.decodeToken, upload.single("profile"), createUser);

//? GET USER BY ID
userRoutes.get("/:userId", middleware.decodeToken, getUserById);

//? UPDATE USER BY ID
userRoutes.put("/:userId", upload.single("profile"), updateUser);

//? UPDATE USER PASSWORD BY ID

userRoutes.put("/change-password/:userId", changePass);

//? DELETE USER BY ID
userRoutes.delete("/:userId", deleteUser);

//? FOLLOW USER

userRoutes.put("/follow/:userId", followUser);

//? UNFOLLOW USER

userRoutes.put("/unfollow/:userId", unfollowUser);