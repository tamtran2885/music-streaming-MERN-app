export default function playlistValidation(values) {
  let errors = {};

  if (!values.title) {
    errors.name = "Please enter name of your playlist";
  }

  if (!values.description) {
    errors.description = "Please add a short description of your playlist";
  }

  return errors;
}
