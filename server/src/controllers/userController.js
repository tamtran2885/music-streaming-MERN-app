import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.log(error)
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.json(req.body)
    res.status(200).json({ data: "User created", user });
  } catch (error) {
    console.log(error);
  }
};
