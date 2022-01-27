import User from "../models/User.js";

export const getUsers = (req, res) => {
  res.json();
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    // const user = new User({});
    const user = await User.create(req.body);
    res.status(200).json({ data: "User created", user });
  } catch (error) {
    console.log(error);
  }
};
