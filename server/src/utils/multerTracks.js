import multer from "multer";
import * as path from "path";



const multerConfig = {
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    try {
        if (file.mimetype !== "audio/mp3" && file.mimetype !== "audio/mpeg") {
          cb(new Error("Track file type is not supported"), false);
          return;
        }
    } catch (error) {
        console.log(error);
    }
    cb(null, true);
  },
};

const uploadTrack = multer(multerConfig);

export default uploadTrack;