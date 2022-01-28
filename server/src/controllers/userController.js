import User from "../models/User.js";

export const getUsers = async (req, res) => {
  console.log(process.env)
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
    res.status(200).json({ data: "User created", user });
  } catch (error) {
    console.log(error);
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user ? res.json(user) : res.json({ message: "User not found" });
  } catch (error) {
    console.log(error)
  }
}

