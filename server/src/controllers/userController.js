import Tracks from "../models/Tracks.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import admin from "firebase-admin";

//? GET ALL USERS
//* @route GET api/user
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
  next();
};

//? ENCRYPT THE PASSWORD
/*
import * as bcrypt from "bcrypt";
const saltRounds = 12;
*/

//? CREATE USER WITH GOOGLE ACCOUNT
//* @route POST api/user/google
export const createUserGoogle = async (req, res, next) => {
  try {
    //? Create instance of User Google
    const userGoogle = new User({
      firstName: req.body.body.firstName,
      lastName: req.body.body.lastName,
      birthday: req.body.body.birthday,
      country: req.body.body.country,
      email: req.body.body.email,
      firebaseUser: req.body.body.firebaseUser,
    });

    if (User.find({ firebaseUser: userGoogle.firebaseUser }).count() > 0) {

      await userGoogle.save();
    }
    res.status(200).json({ data: "User created", userGoogle });
  } catch (error) {
    console.log(error);
  }
  next();
}

//? CREATE USER
//* @route POST api/user
export const createUser = async (req, res, next) => {
  try {
    //? Upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    //? Create instance of User
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
    });

    await user.save();
    res.status(200).json({ data: "User created", user });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? GET USER BY ID
//* @route GET api/user/:userId
export const getUserById = async (req, res, next) => {
  try {
    const firebaseUser = req.params.userId;
    const user = await User.findOne({
      firebaseUser: firebaseUser,
    });
    user ? res.json(user) : res.json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? DELETE USER BY ID
//* @route DELETE api/user/:userId
export const deleteTheUser = async (req, res, next) => {
  try {
    const firebaseUser = req.params.userId;

    //? Find user by id
    const user = await User.findOne({
      firebaseUser: firebaseUser
    });

    //? Delete in Firebase
    admin.auth().deleteUser(firebaseUser).then(() => {
    }).catch((error) => {
      console.log(error);
    });

    //? Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinaryId);

    //? Delete user from db
    await user.remove();
    res.json({ message: "User deleted", user });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? UPDATE USER BY ID
//* @route PUT api/user/:userId
export const updateUser = async (req, res, next) => {
  try {
    const url = req.params.userId;
    const user = await User.findOne({
      firebaseUser: url,
    });

    //? DELETE IMAGE FROM CLOUDINARY
    await cloudinary.uploader.destroy(user.cloudinaryId);

    //? UPLOAD IMAGE TO CLOUDINARY
    const result = await cloudinary.uploader.upload(req.file.path);

    const dataUser = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      birthday: req.body.birthday || user.birthday,
      country: req.body.country || user.country,
      profile: result.secure_url || user.profile,
      email: req.body.email || user.email,
      cloudinaryId: result.cloudinaryId,
      firebaseUser: req.body.firebaseUser,
    };

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
  next();
};

//? FOLLOW USER BY FIREBASE USER
//* @route PUT api/user/follow/:userId
export const followUser = async (req, res, next) => {
  try {
    const UserWhoFollow = req.params.userId;
    const UserFbId = req.query.fbUserToFollow;

    const userToFollow = await User.findOne({ firebaseUser: UserFbId });

    //? SEARCH IF EXIST ONE WITH THE SAME FIREBASE USER
    if (
      userToFollow.followedBy.find(
        (user) => user.firebaseUser === UserWhoFollow
      )
    ) {
      return res
        .status(400)
        .json({ data: "User has been followed", UserWhoFollow });
    }

    userToFollow.followedBy.unshift({ firebaseUser: UserWhoFollow });

    await userToFollow.save();
    res.status(200).json({ data: "User followed", userToFollow });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? unFOLLOW USER BY FIREBASE USER
//* @route PUT api/user/unfollow/:userId
export const unfollowUser = async (req, res, next) => {
  try {
    const UserWhoUnfollow = req.params.userId;
    const UserFbId = req.query.fbUserUnfollow;

    const userToUnfollow = await User.findOne({ firebaseUser: UserFbId });

    if (
      !userToUnfollow.followedBy.find(
        (user) => user.firebaseUser === UserWhoUnfollow
      )
    ) {
      return res
        .status(400)
        .json({ data: "User has been unfollowed", userToUnfollow });
    }

    const removeIndex = userToUnfollow.followedBy
      .map((user) => user.firebaseUser)
      .indexOf(UserWhoUnfollow);

    userToUnfollow.followedBy.splice(removeIndex, 1);

    await userToUnfollow.save();
    res.status(200).json({ data: "User unfollowed", userToUnfollow });
  } catch (error) {
    console.log(error);
  }
  next();
};