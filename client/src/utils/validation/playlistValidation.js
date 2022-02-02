export default function playlistValidation(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "Please enter name of your playlist";
  }

  if (!values.description) {
    errors.description = "Please add a short description of your playlist";
  }

  if (!values.thumbnail) {
    errors.thumbnail = "Please add an image for your playlist";
  }

  return errors;
}
