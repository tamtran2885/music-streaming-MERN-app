import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

//? GET ALL TRACKS
export const getTracks = async (req, res) => {
    console.log(process.env);
    try {
        const tracks = await Tracks.find().populate("user")
        console.log(tracks)



        // console.log(tracks)
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
        // console.log(url)
        track ? res.json(track) : res.json({ message: "track not found" });
    } catch (error) {
        console.log(error);
    }
};

//? DELETE TRACK
export const deleteTrack = async (req, res) => {
    try {
        // Find Track by id
        const track = await Tracks.findById(req.params.trackId);

        // Delete image from cloudinary
        await cloudinary.v2.uploader.destroy(track.cloudinaryId, {
            resource_type: "video"
        });

        // Delete user from db
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

        // Delete image from cloudinary if change image of profile
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
            //TODO---------------------------- fix the upload and delete -----------------------
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