export default function trackValidation(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "Please enter name of your song";
  }

  if (!values.url) {
    errors.url = "Please add your audio file";
  }

  if (!values.thumbnail) {
    errors.thumbnail = "Please add an image for your song";
  }

  if (!values.genre) {
    errors.name = "Please enter name of your song";
  }

  if (!values.albums) {
    errors.albums = "Please add an album";
  }

  if (!values.duration) {
    errors.duration = "Please add duration to your song";
  }

  return errors;
}
