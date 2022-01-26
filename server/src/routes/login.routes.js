import { Router } from 'express';
import { getUsers, createUsers } from '../controllers/userController.js';


export const usersRoutes = Router();

//?get users

usersRoutes.get('/', getUsers)


usersRoutes.post('/', createUsers);