import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
import Album from "../models/Album.js";

//? GET ALL TRACKS
//* @route GET api/tracks
export const getTracks = async (req, res, next) => {
  try {
    const tracks = await Tracks.find().populate("user").populate("likes");
    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
  next();
};

//? ADDING PHOTO TO TRACK
//TODO --------------- CONNECT WITH MODAL!! ------------------------------
//* @route PUT api/tracks/addPhotoToTrack/:trackId
export const addPhotoToTrack = async (req, res, next) => {
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
  next();
};

//? CREATE tracks
//* @route POST api/tracks
export const createTrack = async (req, res, next) => {
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
  next();
};

//? GET TRACKS BY ID
//* @route GET api/tracks/:trackId
export const getTrackById = async (req, res, next) => {
  try {
    const url = req.params.trackId;
    const track = await Tracks.findById(url);
    track ? res.json(track) : res.json({ message: "track not found" });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? DELETE TRACK BY ID
//* @route DELETE api/tracks/:trackId
export const deleteTrack = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;

    //? FIND A TRACK BY ID
    const track = await Tracks.findById(trackId);

    //? DELETE IMAGE FROM CLOUDINARY
    await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
      resource_type: "video",
    });

    // ? DELETE TRACK TO ALBUMS
    const album = track.album
    const trackInAlbum = await Album.findById(album);

    const removeIndex = trackInAlbum.tracks
      .map((track) => track.trackId)
      .indexOf(trackId);
    trackInAlbum.tracks.splice(removeIndex, 1);

    await trackInAlbum.save();

    // ? DELETE TRACK TO PLAYLIST
    const trackInPlaylist = await Playlist.find()
    console.log(trackInPlaylist)

    const array = [];
    trackInPlaylist.map((x) => array.push(x._id));

    const tracksInfo = [];

    for (let i = 0; i < array.length; i++) {
      const tracks = await Playlist.findById(array[i]);
      const removeIndex = tracks.tracks
        .map((track) => track.trackId)
        .indexOf(trackId);
      tracks.tracks.splice(removeIndex, 1);
      await tracks.save();
    }

    //? DELETE TRACK TO USER
    const userId = track.user
    const user = await User.findById(userId)

    const removeUpload = user.uploadedTracks
      .map((track) => track)
      .indexOf(trackId);
    user.uploadedTracks.splice(removeUpload, 1);

    const removeFav = user.favTrackList
      .map((track) => track.trackId)
      .indexOf(trackId);
    user.favTrackList.splice(removeFav, 1);

    await user.save();

    //? DELETE TRACK FROM DB
    await track.remove();
    res.json({ message: "Track deleted", array });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? UPDATE TRACKS BY ID
//* @route PUT api/tracks/edit/:trackId
export const updateTrack = async (req, res, next) => {
  try {
    const url = req.params.trackId;
    const track = await Tracks.findById(url);

    //? DELETE IMAGE FROM CLOUDINARY IF THE USER CHANGES IT AT PROFILE
    await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
      resource_type: "video",
    });
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    const dataTrack = {
      title: req.body.title || track.title,
      reproductions: req.body.reproductions || track.reproductions,
      album: req.body.album || track.album,
      duration: req.body.duration || track.duration,
      artist: req.body.artist || track.artist,
      genre: req.body.genre || track.genre,
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
  next();
};


//? GET TRACKS BY USER
//* @route GET api/tracks/:userId
export const getTracksByUser = async (req, res, next) => {
  try {
    const param = req.query.firebaseUser;
    const tracks = await Tracks.find({
      firebaseUser: param,
    }).populate("user");
    res.json(tracks);
  } catch (error) {
    console.log(error);
  }
  next();
};


//? ADD FAV TO TRACK
//* @route PUT api/tracks/like/:trackId
export const addFavToTrack = async (req, res, next) => {
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
  next();
};

//? REMOVE FAV FROM A TRACK
//* @route PUT api/tracks/unlike/:trackId
export const removeFavFromTrack = async (req, res, next) => {
  const param = req.query.firebaseUser;
  try {
    const trackId = req.params.trackId;
    const track = await Tracks.findById(trackId);

    //? CHECK IF THE TRACK HAST ALREADY BEEN LIKED 
    if (
      track.likes.filter((like) => like.firebaseUser === param).length === 0
    ) {
      return res.status(400).json({ msg: "Track has not been liked" });
    }

    //? GET REMOVE INDEX
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
  next();
};


//? ADD TRACK TO PLAYLIST
//* @route PUT api/tracks/unlike/:trackId
export const addTrackToPlaylist = async (req, res, next) => {
  const query = req.query.playlistId;
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
  next();
};

//? REMOVE A TRACK FROM PLAYLIST
//* @route PUT api/tracks/deleteFromPlaylist/:trackId
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
  next();
};

//? GET TRACKS LIKED BY USER - FIREBASE USER 
//* @route GET api/tracks/likedByUser/:userId
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
  next();
};

//? UPDATE REPRODUCTION COUNTER
//* @route PUT api/tracks/reproducing/:trackId
export const reproductionsCounter = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    console.log(trackId);
    const data = {
      $inc: { reproductions: 1 },
    };

    const updateReproductions = await Tracks.findByIdAndUpdate(trackId, data, {
      new: true,
    });
    res.status(200).json({
      message: "This song has been reproduced one more time",
      updateReproductions,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? ADD TRACK TO ALBUM
//* @route PUT api/tracks/addToAlbum/:trackId
export const trackToAlbum = async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const albumId = req.query.albumId;
    // TRACK TO ALBUM
    const album = await Album.findById(albumId);
    console.log(album);

    if (album.tracks.filter((track) => track.trackId === trackId).length > 0) {
      return res.status(400).json({ msg: "Track has been added" });
    }
    album.tracks.unshift({ trackId: trackId });

    await album.save();

    //? ALBUM TO TRACK
    const track = await Tracks.findById(trackId);
    const albumTrack = track.album;

    const trackWithAlbum = {
      album: albumId,
    };

    const updateTrack = await Tracks.findOneAndUpdate(track, trackWithAlbum, {
      new: true,
    });

    res.status(200).json({ msg: "Album added", updateTrack });
  } catch (error) {
    console.log(error);
  }
  next();
};

//? GET TRACKS BY SEARCH
//* @route GET api/tracks/search
export const getTracksBySearch = async (req, res) => {
  const query = req.query.searchQuery;
  try {
    const title = new RegExp(query, "i");
    const tracks = await Tracks.find({ title });
    res.json({ data: tracks });
  } catch (error) {
    console.log(error);
  }
};
