import Tracks from "../models/Tracks.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("uploadedTracks")

    res.json(users);


  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // res.json(result);
    // Create instance of User
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      country: req.body.country,
      profile: result.secure_url,
      email: req.body.email,
      password: req.body.password,
      cloudinaryId: result.public_id,
      firebaseUser: req.body.firebaseUser,
      uploadedTracks: [],
      playlists: []
    });

    await user.save();
    res.status(200).json({ data: "User created", user });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const url = req.params.userId;
    const user = await User.findOne({
      firebaseUser: url,
    });
    user ? res.json(user) : res.json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Find user by id
    const user = await User.findById(req.params.userId);

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinaryId);

    // Delete user from db
    await user.remove();
    res.json({ message: "User deleted", user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const url = req.params.userId;
    const user = await User.findOne({
      firebaseUser: url,
    });
    console.log(user);

    // Delete image from cloudinary if change image of profile
    // await cloudinary.uploader.destroy(user.cloudinaryId);

    // // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);
    // // console.log(req.file.path)
    const dataUser = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      birthday: req.body.birthday || user.birthday,
      country: req.body.country || user.country,
      profile: user.profile,
      email: req.body.email || user.email,
      cloudinaryId: user.cloudinaryId,
      firebaseUser: req.body.firebaseUser,
    };
    // // console.log(firebaseUser);

    const userToEdit = await User.findOneAndUpdate(
      {
        firebaseUser: url,
      },
      dataUser,
      {
        new: true,
      }
    );

    res.status(200).json({ data: "User updated", userToEdit });
  } catch (error) {
    console.log(error);
  }
};
