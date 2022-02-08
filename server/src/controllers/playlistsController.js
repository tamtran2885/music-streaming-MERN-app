import Playlist from "../models/Playlist.js";
import cloudinary from "../utils/cloudinary.js";

//? GET PLAYLISTS
export const getPlaylists = async (req, res, next) => {
    try {
        const playlist = await Playlist.find();
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
        }).populate("user");
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

//? UPDATE PLAYLIST BY ID
export const updatePlaylistById = async (req, res, next) => {
    try {
        const url = req.params.playlistId;
        const playlist = await Playlist.findOne({
            firebaseUser: url,
        });

        // Delete image from cloudinary if change image of profile
        // await cloudinary.uploader.destroy(user.cloudinaryId);

        // Upload image to cloudinary
        // const result = await cloudinary.uploader.upload(req.file.path);

        const dataPlaylist = {
            firstName: req.body.firstName || playlist.firstName,
            lastName: req.body.lastName || playlist.lastName,
            birthday: req.body.birthday || playlist.birthday,
            country: req.body.country || playlist.country,
            profile: playlist.profile,
            email: req.body.email || playlist.email,
            cloudinaryId: playlist.cloudinaryId,
            firebaseUser: req.body.firebaseUser,
        };

        const userToEdit = await Playlist.findOneAndUpdate(
            {
                firebaseUser: url,
            },
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

//? ADD TRACK TO PLAYLIST
export const addTrackToPlaylist = async (req, res, next) => {
    try {
        const trackId = req.query.trackId;
        const playlistId = req.query.playlistId;

        const playlist = await Playlist.findById(playlistId);

        // Check if the track has already in the playlist
        if (
            playlist.tracks.filter((track) => track.trackId === trackId).length > 0
        ) {
            return res.status(400).json({ msg: "Track has been added" });
        }
        playlist.tracks.unshift({ firebaseUser: param });
        await playlist.save();
        res.json(playlist.tracks);
    } catch (error) {
        console.log(error);
    }
};
