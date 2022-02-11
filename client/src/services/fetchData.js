import axios from "axios";
const token = localStorage.getItem("token")

const config = {
  headers: {
    Authorization: 'Bearer ' + token,

  }
}

export const fetchTracks = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:4000/api/tracks", config);
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchPlaylists = () =>
  new Promise((resolve) => {
    const playlists = axios.get("http://localhost:4000/api/playlists", config);
    setTimeout(() => {
      resolve(playlists);
    }, 1000);
  });

export const fetchAlbums = () =>
  new Promise((resolve) => {
    const albums = axios.get("http://localhost:4000/api/albums", config);
    setTimeout(() => {
      resolve(albums);
    }, 1000);
  });

export const fetchSingleTrack = (_id) => {
  new Promise((resolve) => {
    const track = axios.get(`http://localhost:4000/api/tracks/${_id}`, config);
    setTimeout(() => {
      resolve(track);
    }, 1000);
  });
};

export const fetchTracksByUser = async (userUid) => {
  const userTracks = await axios.get("http://localhost:4000/api/tracks/mine", {

    params: {
      firebaseUser: userUid,
    },
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return userTracks;
};

export const fetchPlayListsByUser = (userUid) => {
  const userPlaylists = axios.get("http://localhost:4000/api/playlists/mine", {
    params: {
      firebaseUser: userUid,
    },
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return userPlaylists;
};

export const fetchAlbumsByUser = (userUid) => {
  const userAlbums = axios.get("http://localhost:4000/api/albums/mine", {
    params: {
      firebaseUser: userUid,
    },
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return userAlbums;
};
