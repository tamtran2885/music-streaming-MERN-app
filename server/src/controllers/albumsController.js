import Album from "../models/Album.js";
import cloudinary from "../utils/cloudinary.js";

export const getAlbums = async (req, res) => {
  try {
    const album = await Album.find();
    res.json(album);
  } catch (error) {
    console.log(error);
  }
};

// GET ALBUMS BY USER
export const getAlbumsByUser = async (req, res) => {
  // console.log(req.query);
  try {
    const param = req.query.firebaseUser;
    const albums = await Album.find({
      firebaseUser: param,
    });
    res.json(albums);
  } catch (error) {
    console.log(error);
  }
};

export const createAlbum = async (req, res) => {
  try {
    const user = req.body.firebaseUser;

    const photo = await cloudinary.v2.uploader.upload(req.file.path);

    const album = new Album({
      title: req.body.title,
      year: req.body.year,
      thumbnail: photo.secure_url,
      cloudinaryId: photo.public_id,
      totalTracks: 0,
      firebaseUser: user,
    });

    await album.save();
    res.status(200).json({ data: "Album created", album });
  } catch (error) {
    console.log(error);
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const album = await Album.findById(albumId);
    res.json(album);
  } catch (error) {
    console.log(error);
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const album = await Album.findById(albumId);

    //CLOUDINARY UPDATE

    await cloudinary.uploader.destroy(album.cloudinaryId);
    const photo = await cloudinary.uploader.upload(req.file.path);

    const dataAlbum = {
      title: req.body.title,
      year: req.body.year,
      thumbnail: photo.secure_url,
      cloudinaryId: photo.public_id,
    };

    const albumUpdate = await Album.findByIdAndUpdate(albumId, dataAlbum);

    res.status(200).json({ data: "Album updated", albumUpdate });
  } catch (error) {
    console.log(error);
  }
  next();
}

//? DELETE ALBUM BY ID
//* @route DELETE api/albums/:albumId
export const deleteAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const album = await Album.findById(albumId);

    //? Delete image from cloudinary
    await cloudinary.uploader.destroy(album.cloudinaryId);

    await album.remove();
    res.json({ message: "Album deleted", album });
  } catch (error) {
    console.log(error);
  }
  next();
}
