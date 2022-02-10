import Playlist from "../models/Playlist.js";
import cloudinary from "../utils/cloudinary.js";

//? GET PLAYLISTS
export const getPlaylists = async (req, res, next) => {
    try {
        const playlist = await Playlist.find().populate("followedBy")
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
            firebaseUser: req.query.firebaseUser,
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
    try {
        const url = req.params.playlistId;

        const playlist = await Playlist.findById(url)

        // DELETE image from cloudinary
        const deletePhoto = await cloudinary.uploader.destroy(playlist.cloudinaryId);

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)

        const dataPlaylist = {
            ...req.body,
            thumbnail: result.url || undefined,
            cloudinaryId: result.public_id
        };

        const playlistUpdate = await Playlist.findByIdAndUpdate(
            playlist
            ,
            dataPlaylist,
            {
                new: true,
            }
        );

        res.status(200).json({ data: "Playlist updated", deletePhoto });
    } catch (error) {
        console.log(error);
    }
    next()
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
    const playlistId = req.params.playlistId;
    // console.log(playlistId)
    try {
        console.log(req.params.playlistId)
        const trackId = req.query.trackId;
        console.log(trackId)

        const playlist = await Playlist.findById(playlistId)
        console.log(playlist)

        // Check if the track is already in the playlist
        if (
            playlist.tracks.filter((track) => track.trackId === trackId).length > 0
        ) {
            return res.status(400).json({ msg: "Track has been added" });
        }
        playlist.tracks.unshift({ trackId: trackId });
        await playlist.save();
        res.json(playlist.tracks);
    } catch (error) {
        console.log(error);
    }
};

// DELETE SONG IN PLAYLIST

export const deleteTrackInPlaylist = async (req, res, next) => {
    const playlistId = req.params.playlistId
    const trackId = req.query.trackId
    try {
        // console.log(playlistId)
        // console.log(trackId)
        const playlist = await Playlist.findById(playlistId)

        //? REMOVE THE INDEX
        const removeIndex = playlist.tracks
            .map((unfollow) => unfollow.firebaseUser)
            .indexOf(trackId);

        playlist.tracks.splice(removeIndex, 1);
        await playlist.save();
        res.json(playlist.tracks);
    } catch (error) {
        console.log(error)
    }
}

//? FOLLOW PLAYLIST
export const followPlaylist = async (req, res, next) => {

    const param = req.query.firebaseUser;
    console.log(param)
    try {
        const playlistId = req.params.playlistId;
        const playlist = await Playlist.findById(playlistId);

        // Check if the playlist has already been followed
        if (playlist.followedBy.filter((follow) => follow.firebaseUser === param).length > 0) {
            return res.status(400).json({ msg: "Playlist has already been added to favorites" });
        }
        playlist.followedBy.unshift({ firebaseUser: param });
        await playlist.save();
        res.json(playlist.followedBy);
    } catch (error) {
        console.log(error);
    }
}

//? UNFOLLOW PLAYLIST
export const unfollowPlaylist = async (req, res, next) => {
    const param = req.query.firebaseUser;
    try {
        const playlistId = req.params.playlistId;
        const playlist = await Playlist.findById(playlistId);

        // Check if the playlist has already been followed
        if (
            playlist.followedBy.filter((follow) => follow.firebaseUser === param).length === 0
        ) {
            return res.status(400).json({ msg: "Playlist has been removed from favorites" });
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
}