export const checkLike = (uid) => {
  if (likes.filter((like) => like.firebaseUser === uid).length === 0) {
    return false;
  } else {
    return true;
  }
};
