export default function albumValidation(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Please enter title of your album";
  }

  if (!values.year) {
    errors.year = "Please enter year of your album";
  }

  if (!values.totalTracks) {
    errors.totalTracks = "Please enter the number of tracks in your album";
  }

  return errors;
}
