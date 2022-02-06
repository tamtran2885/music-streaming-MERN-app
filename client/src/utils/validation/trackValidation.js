export default function trackValidation(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Please enter name of your song";
  }

  if (!values.genre) {
    errors.genre = "Please enter type of your song";
  }

  if (!values.duration) {
    errors.duration = "Please add duration to your song";
  }

  return errors;
}
