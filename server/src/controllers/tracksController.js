import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";

//? GET ALL TRACKS
export const getTracks = async (req, res) => {
  console.log(process.env);
  try {
    const tracks = await Tracks.find().populate("user").populate("likes");
    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
};

//? ADDING NEW TRACK IN USERS COLLECTION
export const addTracksToUser = async (req, res, track) => {
  try {
    const data = {
      $push: { uploadedTracks: track },
    };

    const newTrack = await User.findByIdAndUpdate(track.user._id, data, {
      new: true,
    });
    // res.status(200).json({ data: "Added track to user!", newTrack })
  } catch (error) {
    console.log(error);
  }
};

export const addPhotoToTrack = async (req, res) => {
  const trackId = req.params.trackId;
  try {
    const thumbnail = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    console.log(thumbnail);

    const newTrack = {
      cloudinaryId: thumbnail.public_id,
      photoTrack: thumbnail.secure_url,
    };

    const trackToUpdate = await Tracks.findByIdAndUpdate(trackId, newTrack, {
      new: true,
    });
    console.log(trackToUpdate);

    res.status(200).json({ msg: "ERES UN CREMA" });
    await trackToUpdate.save();
  } catch (error) {
    console.log(error);
  }
};

export const createTrack = async (req, res) => {
  try {
    //? UPLOAD AUDIO
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    console.log(req.body);
    const track = new Tracks({
      //? PASSING DATA TO NEW TRACK
      ...req.body,

      //? PASSING AUDIO FILE TO NEW TRACK
      cloudinaryId: result.public_id,
      urlTrack: result.secure_url,
      firebaseUser: req.body.firebaseUser,
    });
    //? SAVING NEW TRACK IN TRACKS COLLECTION
    await track.save();
    res.status(200).json({ data: "Track created", track });
  } catch (error) {
    console.log(error);
  }
};

//? GET TRACK BY ID
export const getTrackById = async (req, res) => {
  try {
    const url = req.params.trackId;
    const track = await Tracks.findById(url);
    track ? res.json(track) : res.json({ message: "track not found" });
  } catch (error) {
    console.log(error);
  }
};

//? DELETE TRACK
export const deleteTrack = async (req, res) => {
  try {
    //? FIND A TRACK BY ID
    const track = await Tracks.findById(req.params.trackId);

    //? DELETE IMAGE FROM CLOUDINARY
    // console.log(track.cloudinaryId);
    await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
      resource_type: "video",
    });

    //? DELETE USER FROM DB
    await track.remove();
    // await getTracks();

    res.json({ message: "Track deleted", track });
  } catch (error) {
    console.log(error);
  }
};

// TODO UPDATE TRACK
export const updateTrack = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.trackId);
  try {
    const url = req.params.trackId;
    const track = await Tracks.findById(url);

    // //? DELETE IMAGE FROM CLOUDINARY IF THE USER CHANGES IT AT PROFILE
    // await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
    //   resource_type: "video",
    // });
    // const result = await cloudinary.v2.uploader.upload(req.file.path, {
    //   resource_type: "auto",
    // });

    const dataTrack = {
      title: req.body.title || track.title,
      reproductions: req.body.reproductions || track.reproductions,
      album: req.body.album || track.album,
      duration: req.body.duration || track.duration,
      artist: req.body.artist || track.artist,
      genre: req.body.genre || track.genre,
      //TODO---------------------------- FIX THE UPLOAD AND DELETE -----------------------
      cloudinaryId: track.cloudinaryId,
      urlTrack: track.urlTrack,
    };

    const trackToEdit = await Tracks.findByIdAndUpdate(
      req.params.trackId,
      dataTrack,
      {
        new: true,
      }
    );

    res.status(200).json({ data: "Track updated", trackToEdit });
  } catch (error) {
    console.log(error);
  }
};

// GET TRACKS BY USER
export const getTracksByUser = async (req, res) => {
  // console.log(req.query);
  try {
    const param = req.query.firebaseUser;
    const tracks = await Tracks.find({
      firebaseUser: param,
    }).populate("user");
    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
};

// Add Fav to a track
// @route PUT api/tracks/like/:trackId
export const addFavToTrack = async (req, res) => {
  const param = req.query.firebaseUser;
  try {
    const trackId = req.params.trackId;
    const track = await Tracks.findById(trackId);

    // Check if the track has already been liked
    if (track.likes.filter((like) => like.firebaseUser === param).length > 0) {
      return res.status(400).json({ msg: "Track has been liked" });
    }
    track.likes.unshift({ firebaseUser: param });
    await track.save();

    // Ad fav track to fav list of user
    const user = await User.findOne({
      firebaseUser: param,
    });
    user.favTrackList.unshift({ trackId: track._id });
    await user.save();

    // return respond
    res.json(track.likes);
  } catch (error) {
    console.log(error);
  }
};

// Remove Fav from a track
// @route PUT api/tracks/unlike/:trackId
export const removeFavFromTrack = async (req, res) => {
  const param = req.query.firebaseUser;
  try {
    const trackId = req.params.trackId;
    const track = await Tracks.findById(trackId);

    // console.log(track.likes)
    // Check if the track has already been liked
    if (
      track.likes.filter((like) => like.firebaseUser === param).length === 0
    ) {
      return res.status(400).json({ msg: "Track has not been liked" });
    }

    // Get remove index
    const removeIndex = track.likes
      .map((like) => like.firebaseUser)
      .indexOf(param);
    track.likes.splice(removeIndex, 1);

    //? DELETE FAVORITE TRACK FROM USER FAVTRACK

    const user = await User.findOne({ firebaseUser: param });
    const removeIndexUser = user.favTrackList
      .map((like) => like.trackId === trackId)
      .indexOf(trackId);

    user.favTrackList.splice(removeIndexUser, 1);
    console.log(removeIndexUser);

    await track.save();
    await user.save();
    res.json(track.likes);
  } catch (error) {
    console.log(error);
  }
};

// Need to check
//? ADD TRACK TO PLAYLIST
export const addTrackToPlaylist = async (req, res, next) => {
  const query = req.query.playlistId;
  // console.log(playlistId)
  try {
    //console.log(req.query.playlistId);
    const param = req.params.trackId;
    console.log(param);

    const playlist = await Playlist.findById(query);
    console.log(playlist);

    // Check if the track is already in the playlist
    if (playlist.tracks.filter((track) => track.trackId === param).length > 0) {
      return res.status(400).json({ msg: "Track has been added" });
    }

    playlist.tracks.unshift({ trackId: param });
    await playlist.save();
    res.json(playlist.tracks);
  } catch (error) {
    console.log(error);
  }
};

// ?DELETE TRACK IN PLAYLIST

export const deleteTrackFromPlaylist = async (req, res, next) => {
  const query = req.query.playlistId;
  const param = req.params.trackId;
  try {
    const playlist = await Playlist.findById(query);
    const removeIndex = playlist.tracks
      .map((track) => track.trackId)
      .indexOf(param);
    playlist.tracks.splice(removeIndex, 1);

    await playlist.save();
    res.json(playlist.tracks);
  } catch (error) {
    console.log(error);
  }
};

//TODO GET TRACK DETAILS IN MY FAVORITES
export const getTrackDetailsInFav = async (req, res, next) => {
  const firebaseId = req.params.userId;
  try {
    const user = await User.findOne({ firebaseUser: firebaseId });
    console.log(user);

    const array = [];
    user.favTrackList.map((x) => array.push(x.trackId));

    const tracksInfo = [];

    for (let i = 0; i < array.length; i++) {
      const detailsTracks = await Tracks.findById(array[i]);
      tracksInfo.push(detailsTracks);
    }

    res.status(200).json({ msg: "Done", tracksInfo });
  } catch (error) {
    console.log(error);
  }
};
