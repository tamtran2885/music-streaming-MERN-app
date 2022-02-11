import Playlist from "../models/Playlist.js";
import cloudinary from "../utils/cloudinary.js";
import Tracks from "../models/Tracks.js";

//? GET PLAYLISTS
export const getPlaylists = async (req, res, next) => {
  try {
    const playlist = await Playlist.find().populate("followedBy");
    res.json(playlist);
  } catch (error) {
    console.log(error);
  }
};

//? GET PLAYLISTS BY USER
export const getPlaylistsByUser = async (req, res) => {
  // console.log(req.query);
  try {
    const param = req.query.firebaseUser;
    const playlists = await Playlist.find({
      firebaseUser: param,
    });
    res.json(playlists);
  } catch (error) {
    console.log(error);
  }
};

//? CREATE PLAYLIST
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
      firebaseUser: req.body.firebaseUser,
    });

    await playlist.save();
    res.status(200).json({ data: "Playlist created", playlist });
  } catch (error) {
    console.log(error);
  }
};

//? GET PLAYLIST BY ID
export const getPlaylistById = async (req, res, next) => {
  try {
    const url = req.params.playlistId;
    const playlist = await Playlist.findById(url);
    playlist ? res.json(playlist) : res.json({ message: "playlist not found" });
  } catch (error) {
    console.log(error);
  }
};

// TODO UPDATE PLAYLIST BY ID
export const updatePlaylistById = async (req, res, next) => {
  console.log(req.body);
  try {
    const url = req.params.playlistId;
    const playlist = await Playlist.findById(url);

    const dataPlaylist = {
      title: req.body.title || playlist.title,
      collaborative: req.body.collaborative || playlist.collaborative,
      description: req.body.description || playlist.description,
      cover: req.body.cover || playlist.cover,
      thumbnail: playlist.thumbnail,
      publicAccessible: req.body.publicAccessible || playlist.publicAccessible,
      cloudinaryId: playlist.cloudinaryId,
      firebaseUser: playlist.firebaseUser,
    };

    const userToEdit = await Playlist.findByIdAndUpdate(
      req.params.playlistId,
      dataPlaylist,
      {
        new: true,
      }
    );

    res.status(200).json({ data: "Playlist updated", userToEdit });
  } catch (error) {
    console.log(error);
  }
};

//? DELETE PLAYLIST
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
};

//? FOLLOW PLAYLIST
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
};

//? UNFOLLOW PLAYLIST
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
      .map((follow) => follow.firebaseUser)
      .indexOf(param);

    playlist.followedBy.splice(removeIndex, 1);
    await playlist.save();
    res.json(playlist.followedBy);
  } catch (error) {
    console.log(error);
  }
};

//? GET PLAYLIST DETAILS
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
};
