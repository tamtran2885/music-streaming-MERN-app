// import * as yup from "yup";

// export const albumSchema = yup.object().shape({
//   title: yup.string().required("A title is required"),
//   year: yup.number().required("A year is required"),
//   thumbnail: yup.mixed().required("File is required"),
//   totalTracks: yup.number().required("The number of tracks is required"),
// });

// title: "",
//   year: "",
//   thumbnail: "",
//   totalTracks: "",
//   userId: "",
//   likedBy: "",

export default function albumValidation(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Please enter title of your album";
  }

  if (!values.year) {
    errors.year = "Please enter year of your album";
  }

  // if (!values.thumbnail) {
  //   errors.thumbnail = "Please add an image for your album";
  // }

  if (!values.totalTracks) {
    errors.totalTracks = "Please enter the number of tracks in your album";
  }

  return errors;
}
