import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "df9bhc3rb",
  api_key: "192496941655173",
  api_secret: "5I5zo4FS7QNGMciEqJFg4Q4v-ns"

  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
