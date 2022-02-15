import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
  deleteTheUser,
  updateUser,
  followUser,
  unfollowUser,
  createUserGoogle
} from "../controllers/userController.js";
import upload from "../utils/multer.js";

export const userRoutes = Router();

//? GET ALL USERS
//* @route GET api/user
userRoutes.get("/", getUsers);

//? CREATE USER
//* @route POST api/user
userRoutes.post("/", upload.single("profile"), createUser);

//? CREATE USER WITH GOOGLE ACCOUNT
//* @route POST api/user/google
userRoutes.post("/google", createUserGoogle);

//? GET USER BY ID
//* @route GET api/user/:userId
userRoutes.get("/:userId", getUserById);

//? UPDATE USER BY ID
//* @route PUT api/user/:userId
userRoutes.put("/:userId", upload.single("profile"), updateUser);

//? DELETE USER BY ID
//* @route DELETE api/user/:userId
userRoutes.delete("/:userId", deleteTheUser);

//? FOLLOW USER BY FIREBASE USER
//* @route PUT api/user/follow/:userId
userRoutes.put("/follow/:userId", followUser);

//? unFOLLOW USER BY FIREBASE USER
//* @route PUT api/user/unfollow/:userId
userRoutes.put("/unfollow/:userId", unfollowUser);