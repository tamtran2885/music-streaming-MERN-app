import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

//query for get tracks

export const getTracks = async (req, res) => {
    console.log(process.env);
    try {
        const tracks = await Tracks.find().populate("User")

        console.log(tracks)
        res.json(tracks);
    } catch (error) {
        console.log(error);
    }
};



// query for create tracks



export const createTrack = async (req, res) => {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        // console.log(req.file.path);

        const track = new Tracks({
            ...req.body,
            cloudinaryId: result.public_id,
            urlTrack: result.secure_url,

        });

        await track.save()
        res.status(200).json({ data: "Track created", track });
    } catch (error) {
        console.log(error);
        console.log("PEPI")
        // console.log(req.file.path)
    }
};

//query for get tracks by id

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

//query for delete tracks by id

export const deleteTrack = async (req, res) => {
    try {
        // Find Track by id
        const track = await Tracks.findById(req.params.trackId);

        // Delete image from cloudinary
        console.log(track.cloudinaryId)
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

// query for update tracks by id

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
            //TODO fix the upload and delete
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



