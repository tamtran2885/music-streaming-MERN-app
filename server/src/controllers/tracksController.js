import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";

//? GET ALL TRACKS
export const getTracks = async (req, res) => {
  console.log(process.env);
  try {
    const tracks = await Tracks.find().populate("user");
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
  const thumbnail = await cloudinary.v2.uploader.upload(req.file.path, {
    resource_type: "auto",
  });
};

// //? CREATE A NEW TRACK
// export const createTrack = async (req, res) => {
//     try {

//         //? UPLOAD AUDIO
//         const result = await cloudinary.v2.uploader.upload(req.file.path, {
//             resource_type: "auto"
//         });

//         addPhotoToTrack(req, res)

//     // const result = await cloudinary.v2.uploader.upload(req.file.path);

//     // addPhotoToTrack(req,res)

//     const track = new Tracks({
//       //? PASSING DATA TO NEW TRACK
//       ...req.body,

//       //? PASSING AUDIO FILE TO NEW TRACK
//       cloudinaryId: result.public_id,
//       urlTrack: result.secure_url,
//       firebaseUser: req.body.firebaseUser,

//       //? PASSING PHOTO FILE TO NEW TRACK
//       // thumbnail: photo.secure_url,
//       // thumbnailId: photo.public_id
//     });
//     //? SAVING NEW TRACK IN TRACKS COLLECTION
//     await track.save();
//     res.status(200).json({ data: "Track created", track });

//     //? SAVING NEW TRACK IN USER DOCUMENT
//     // addTracksToUser(req, res, track);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createTrack = async (req, res) => {
  try {
    //? UPLOAD AUDIO
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

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
    console.log(track.cloudinaryId);
    await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
      resource_type: "video",
    });

    //? DELETE USER FROM DB
    await track.remove();
    res.json({ message: "Track deleted", track });
  } catch (error) {
    console.log(error);
  }
};

//? UPDATE TRACK
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
    await track.save();
    res.json(track.likes);
  } catch (error) {
    console.log(error);
  }
};

// Check like of user of a single song
// @route GET api/tracks/checkLike/:trackId
export const checkLike = async (req, res) => {
  const param = req.query.firebaseUser;
  try {
    const trackId = req.params.trackId;
    const track = await Tracks.findById(trackId);

    if (
      track.likes.filter((like) => like.firebaseUser === param).length === 0
    ) {
      return res.status(400).json({ msg: "Track has not been liked by user" });
    }
    res.json(likes);
  } catch (error) {
    console.log(error);
  }
};
