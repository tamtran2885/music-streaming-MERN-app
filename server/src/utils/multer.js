import multer from "multer";
import * as path from "path";

const multerConfig = {
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Image file type is not supported"), false);
      return;
    }
    cb(null, true);
  },
};

const upload = multer(multerConfig);

export default upload;
