export default function userValidation(values) {
  let errorMessage = {};

  if (!values.firstName) {
    errorMessage.firstName = "Please enter your first name";
  }

  if (!values.lastName) {
    errorMessage.lastName = "Please enter your last name";
  }

  if (!values.email) {
    errorMessage.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errorMessage.email = "Email address is invalid";
  }
  if (!values.password) {
    errorMessage.password = "Password is required";
  } else if (values.password.length < 6) {
    errorMessage.password = "Password needs to be 6 characters or more";
  }

  if (!values.confirmPassword) {
    errorMessage.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errorMessage.confirmPassword = "Passwords do not match";
  }
  return errorMessage;
}
