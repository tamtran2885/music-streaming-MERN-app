// Add like or remove like from a song
export const addFollow = async (playlistId, firebaseUser) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/playlist/follow/${playlistId}?firebaseUser=${firebaseUser}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const removeFollow = async (playlistId, firebaseUser) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/playlist/unfollow/${playlistId}?firebaseUser=${firebaseUser}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const addTrackToPLaylist = async (playlistId, trackId) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/playlist/addTrack/${playlistId}?trackId=${trackId}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const removeTrackFromPlaylist = async (trackId, playlistId) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/playlist/removeTrack/${playlistId}?trackId=${trackId}`
    );
  } catch (err) {
    console.error(err);
  }
};
