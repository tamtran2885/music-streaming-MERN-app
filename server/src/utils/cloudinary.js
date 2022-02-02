import cloudinary from "cloudinary";
// import dotenv from 'dotenv'
// dotenv.config()






cloudinary.v2.config({
  cloud_name: "dj30eyyuy",
  api_key: 842436786583383,
  api_secret: "lSPIpVHqqaYRniS_Df0CrFbThb8"

  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(CLOUDINARY_CLOUD_NAME)

export default cloudinary;
