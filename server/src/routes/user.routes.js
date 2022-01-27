import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController.js";

export const userRoutes = Router();

// ?get users

userRoutes.get("/", getUsers);

userRoutes.post("/", createUser);
