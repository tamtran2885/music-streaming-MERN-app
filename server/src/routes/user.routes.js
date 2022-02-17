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
  createUserGoogle
} from "../controllers/userController.js";
import upload from "../utils/multer.js";
import middleware from "../middlewares/index.js"

export const userRoutes = Router();


// ? GET USERS
userRoutes.get("/", getUsers);

userRoutes.post("/loggedIn", LogIn);

// ? CREATE USER
userRoutes.post("/", upload.single("profile"), createUser);

// ? CREATE USER GOOGLE
userRoutes.post("/google", createUserGoogle);

//? GET USER BY ID
userRoutes.get("/:userId", middleware.decodeToken, getUserById);

//? UPDATE USER BY ID
userRoutes.put("/:userId", middleware.decodeToken, upload.single("profile"), updateUser);

//? UPDATE USER PASSWORD BY ID

userRoutes.put("/change-password/:userId", middleware.decodeToken, changePass);

//? DELETE USER BY ID
userRoutes.delete("/:userId", middleware.decodeToken, deleteUser);

//? FOLLOW USER

userRoutes.put("/follow/:userId", followUser);

//? UNFOLLOW USER

userRoutes.put("/unfollow/:userId", unfollowUser);