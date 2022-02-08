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
}

//? CREATE PLAYLIST
export const createPlaylist = async (req, res, next) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log(result.public_id)

        const playlist = new Playlist({
            title: req.body.title,
            collaborative: req.body.collaborative,
            description: req.body.description,
            cover: req.body.cover,
            thumbnail: result.secure_url,
            cloudinaryId: result.public_id,
            publicAccessible: req.body.publicAccessible,
            numberSongs: 0,
            followers: 0,
            userId: req.body.userId,
            tracks: req.body.tracks
        });

        await playlist.save();
        res.status(200).json({ data: "Playlist created", playlist })

    } catch (error) {
        console.log(error)
    }
}

//? GET PLAYLIST BY ID
export const getPlaylistById = async (req, res, next) => {
    try {
        const url = req.params.playlistId;
        const playlist = await Playlist.findById(url);
        playlist ? res.json(playlist) : res.json({ message: "playlist not found" });
    } catch (error) {
        console.log(error);
    }
}

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
}

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
}

//? ADD TRACK TO PLAYLIST
export const addTrackToPlaylist = async (req, res, next) => {
    try {
        const trackId = req.query.tracks;
        const playlistId = req.params.playlistId;

        const playlist = await Playlist.findById(playlistId);
        console.log(playlist.tracks)
        // console.log(trackId)

        // Check if the track is already in the playlist
        // if (playlist.tracks.filter((track) => track.trackId === trackId).length > 0) {
        //     return res.status(400).json({ msg: "Track has been added" });
        // }
        // playlist.tracks.unshift({ tracks: trackId });
        // await playlist.save();
        res.json(playlist);
    } catch (error) {
        console.log(error)
    }
}