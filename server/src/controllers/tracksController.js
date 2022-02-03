import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

//? GET ALL TRACKS
export const getTracks = async (req, res) => {
    console.log(process.env);
    try {
        const tracks = await Tracks.find().populate("user")
        res.json(tracks);
    } catch (error) {
        console.log(error)
    }
};



//? ADDING NEW TRACK IN USERS COLLECTION
export const addTracksToUser = async (req, res, track) => {
    try {
        const data = {
            $push: { uploadedTracks: track }
        };

        const newTrack = await User.findByIdAndUpdate(
            track.user._id,
            data,
            { new: true }
        );
        res.status(200).json({ data: "Added track to user!", newTrack })
    } catch (error) {
        console.log(error);
    }

};

//? CREATE A NEW TRACK
export const createTrack = async (req, res) => {
    try {

        //? UPLOAD AUDIO
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const track = new Tracks({
            //? PASSING DATA TO NEW TRACK
            ...req.body,
            //? PASSING AUDIO FILE TO NEW TRACK
            cloudinaryId: result.public_id,
            urlTrack: result.secure_url,

        });
        //? SAVING NEW TRACK IN TRACKS COLLECTION
        await track.save()
        res.status(200).json({ data: "Track created", track });

        //? SAVING NEW TRACK IN USER DOCUMENT
        addTracksToUser(req, res, track)

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
        console.log(track.cloudinaryId)
        await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
            resource_type: "video"
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
    try {

        const url = req.params.trackId;
        const track = await Tracks.findById(url);

        //? DELETE IMAGE FROM CLOUDINARY IF THE USER CHANGES IT AT PROFILE
        await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
            resource_type: "video"
        });
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const dataTrack = {
            title: req.body.title,
            reproductions: req.body.reproductions,
            album: req.body.album,
            duration: req.body.duration,
            track_id: "",
            //TODO---------------------------- FIX THE UPLOAD AND DELETE -----------------------
            cloudinaryId: track.cloudinaryId || result.public_id,
            urlTrack: result.secure_url
        };

        const trackToEdit = await Tracks.findByIdAndUpdate(req.params.trackId, dataTrack,
            {
                new: true,
            }
        );

        res.status(200).json({ data: "Track updated", trackToEdit });
    } catch (error) {
        console.log(error);
    }
};



