import Playlist from "../models/Playlist.js";
import Tracks from "../models/Tracks.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

//? GET PLAYLISTS
//* @route GET api/playlists
export const getPlaylists = async (req, res, next) => {
  try {
    const playlist = await Playlist.find().populate("followedBy");
    res.json(playlist);
  } catch (error) {
    console.log(error);
  }
  next()
};

//? GET PLAYLIST BY USER ID
//* @route GET api/playlists/mine
export const getPlaylistsByUser = async (req, res, next) => {
  console.log(req.query);
  try {
    const param = req.query.firebaseUser;
    const playlists = await Playlist.find({
      firebaseUser: param,
    }).populate("user");
    res.json(playlists);
  } catch (error) {
    console.log(error);
  }
  next()
};

//? CREATE PLAYLIST
//* @route POST api/playlists
export const createPlaylist = async (req, res, next) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(result.public_id);

    const playlist = new Playlist({
      //? PASSING DATA TO NEW TRACK
      ...req.body,

      thumbnail: result.secure_url,
      cloudinaryId: result.public_id,
      firebaseUser: req.query.firebaseUser,
    });

    await playlist.save();
    res.status(200).json({ data: "Playlist created", playlist });
  } catch (error) {
    console.log(error);
  }
  next()
};

//? GET PLAYLIST BY ID
//* @route GET api/playlists/:playlistId
export const getPlaylistById = async (req, res, next) => {
  try {
    const url = req.params.playlistId;
    const playlist = await Playlist.findById(url);
    playlist ? res.json(playlist) : res.json({ message: "playlist not found" });
  } catch (error) {
    console.log(error);
  }
  next()
};

//? UPDATE PLAYLIST BY ID
//* @route PUT api/playlists/edit/:playlistId
export const updatePlaylistById = async (req, res, next) => {
  try {
    const url = req.params.playlistId;

    const playlist = await Playlist.findById(url);

    // DELETE image from cloudinary
    const deletePhoto = async () => {
      await cloudinary.uploader.destroy(playlist.cloudinaryId);
    };
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const dataPlaylist = {
      title: req.body.title || playlist.title,
      collaborative: req.body.collaborative || playlist.collaborative,
      description: req.body.description || playlist.description,
      cover: req.body.cover || playlist.cover,
      thumbnail: result.secure_url,
      publicAccessible: req.body.publicAccessible || playlist.publicAccessible,
      cloudinaryId: playlist.cloudinaryId,
      firebaseUser: playlist.firebaseUser,
    };

    const playlistUpdate = await Playlist.findByIdAndUpdate(
      playlist,
      dataPlaylist,
      {
        new: true,
      }
    );

    res.status(200).json({ data: "Playlist updated", playlistUpdate });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? DELETE PLAYLIST
//* @route DELETE api/playlists/:playlistId
export const deletePlaylistById = async (req, res, next) => {
  try {
    // Find playlist by id
    const url = req.params.playlistId;
    const playlist = await Playlist.findById(url);

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(playlist.cloudinaryId);

    // Delete user from db
    await playlist.remove();
    res.json({ message: "Playlist deleted", playlist });
  } catch (error) {
    console.log(error);
  }
  next()
};

//? FOLLOW PLAYLIST
//* @route PUT api/playlists/follow/:playlistId
export const followPlaylist = async (req, res, next) => {
  const param = req.query.firebaseUser;
  console.log(param);
  try {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist has already been followed
    if (
      playlist.followedBy.filter((follow) => follow.firebaseUser === param)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "Playlist has already been added to favorites" });
    }
    playlist.followedBy.unshift({ firebaseUser: param });
    await playlist.save();
    res.json(playlist.followedBy);
  } catch (error) {
    console.log(error);
  }
  next()
};

//? UNFOLLOW PLAYLIST
//* @route PUT api/playlists/unfollow/:playlistId
export const unfollowPlaylist = async (req, res, next) => {
  const param = req.query.firebaseUser;
  try {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist has already been followed
    if (
      playlist.followedBy.filter((follow) => follow.firebaseUser === param)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Playlist has been removed from favorites" });
    }

    // Get remove index
    const removeIndex = playlist.followedBy
      .map((unfollow) => unfollow.firebaseUser)
      .indexOf(param);

    playlist.followedBy.splice(removeIndex, 1);
    await playlist.save();
    res.json(playlist.followedBy);
  } catch (error) {
    console.log(error);
  }
  next()
};

//? GET PLAYLIST BY ID AND TRACKS DETAILS
//* @route GET api/playlists/unfollow/:playlistId
export const getPlaylistByIdAndDetails = async (req, res, next) => {
  try {
    const url = req.params.playlistId;
    const playlist = await Playlist.findById(url);

    const array = [];
    playlist.tracks.map((x) => {
      array.push(x.trackId);
    });

    const tracksInfo = [];

    for (let i = 0; i < array.length; i++) {
      const detailsTracks = await Tracks.findById(array[i]);
      tracksInfo.push(detailsTracks);
    }

    tracksInfo
      ? res.json(tracksInfo)
      : res.json({ message: "playlist not found" });
  } catch (error) {
    console.log(error);
  }
  next()
};

//? GET PLAYLIST BY ID AND SHOW TRACKS DETAILS
//* @route GET api/playlists/details/:playlistId
export const getPlaylistByIdAndInfo = async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId);
    const firebaseUser = playlist.firebaseUser;

    const user = await User.findOne({ firebaseUser: firebaseUser });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
  next()
};

//? GET PLAYLIST BY ID AND SHOW USERS DETAILS
//* @route GET api/playlists/detailsUser/:playlistId
export const getFollowedPlaylist = async (req, res, next) => {
  try {
    const user = req.params.userId;
    console.log(user)
    const playlists = await Playlist.find()
    //console.log(playlists)

    const array = [];

    playlists.map((x) => {
      const playlist = x.followedBy
      //console.log(playlist)
      playlist.map((f) => {
        console.log(f.firebaseUser === user)
        if (f.firebaseUser === user) {
          array.push(x.id)
        }
      })
    })

    const result = array;

    res.status(200).json({ data: "Playlist matched", result });
  } catch (error) {
    console.log(error)
  }
  next();
}


//? GET FOLLOWING PLAYLISTS BY USER
//* @route GET api/playlists/getFollowing/:userId
export const getFollowingPlaylistsByUser = async (req, res, next) => {
  try {
    const user = req.params.userId;
    const playlists = await Playlist.find();

    const array = [];
    playlists.map((x) => {
      const playlist = x.followedBy;

      playlist.map((f) => {
        if (f.firebaseUser === user) {
          array.push(x);
        }
      });
    });

    const result = array;

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
  next();
};
