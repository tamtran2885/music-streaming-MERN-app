import userModel from '../models/userModel.js';

export const getUsers = (req, res) => {
    res.json();
}

export const createUsers = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new userModel({
        });
        await userModel.save();
    } catch (error) {
        console.log(error);
    }
}