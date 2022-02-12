import Tracks from "../models/Tracks.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

import * as bcrypt from "bcrypt";
const saltRounds = 12;

// (async () => {
//   // Technique 1 (generate a salt and hash on separate function calls):
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hash = await bcrypt.hash(myPlaintextPassword, salt);
//   // Store hash in your password DB.

//   // Technique 2 (auto-gen a salt and hash):
//   const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
//   // Store hash in your password DB.
// })();

export const createUser = async (req, res) => {
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  try {
    // Upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // Create instance of User
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      country: req.body.country,
      profile: result.secure_url,
      email: req.body.email,
      password: hash,
      cloudinaryId: result.public_id,
      firebaseUser: req.body.firebaseUser,
      // uploadedTracks: [],
      // playlists: []
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

// TODO

export const updateUser = async (req, res) => {
  try {
    const url = req.params.userId;
    const user = await User.findOne({
      firebaseUser: url,
    });
    console.log(user);

    // Delete image from cloudinary if change image of profile
    // await cloudinary.uploader.destroy(user.cloudinaryId);

    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

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
    // console.log(firebaseUser);

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

// TODO

export const changePass = async (req, res) => {};
/*
export const changePass = async (req, res) => {
  try {
    const url = req.headers;
    console.log(url)
    const user = await User.findOne({
      firebaseUser: url,
    });

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
    // console.log(firebaseUser);

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

//const hash = await bcrypt.hash(req.body.password, saltRounds);

changePass();*/

// TODO FOLLOW USER

export const followUser = async (req, res, next) => {
  try {
    const UserFbId = req.params.userId;

    const UserWhoFollow = req.query.fbUserFollow;

    console.log(UserWhoFollow);
    console.log(UserFbId);

    const userToFollow = await User.findOne({ firebaseUser: UserFbId });

    console.log(userToFollow);

    /*if(userToFollow.followedBy.filter((user) => user.followedBy === UserWhoFollow).length > 0)
    {
      return res.status(400).json({ data: "User has been followed", userToFollow });
    }*/

    userToFollow.followedBy.unshift({ firebaseUser: UserWhoFollow });

    await userToFollow.save();
    res.status(200).json({ data: "User followed", userToFollow });
  } catch (error) {
    console.log(error);
  }
  next();
};

// TODO UNFOLLOW USER
