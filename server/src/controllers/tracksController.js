import Tracks from "../models/Tracks.js";
import cloudinary from "../utils/cloudinary.js";

//query for get tracks

export const getTracks = async (req, res) => {
    console.log(process.env);
    try {
    const tracks = await Tracks.find();
    res.json(tracks);
    } catch (error) {
        console.log(error);
    }
};

// query for create tracks

export const createTrack = async (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        console.log(req.file.path);

        const track = new Tracks({
            title: req.body.title,
            reproductions: req.body.reproductions,
            album: req.body.album,
            duration: req.body.duration,
            user_id:"",
            cloudinaryId: result.public_id,
            urlTrack: result.secure_url
        });

        await track.save();
        res.status(200).json({ data: "Track created", track });
    } catch (error) {
        console.log(error);
        console.log("hola")
    }




};