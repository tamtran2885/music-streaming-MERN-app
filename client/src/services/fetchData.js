import axios from "axios";

export const fetchTracks = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:4000/api/tracks");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchPlaylists = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:4000/api/playlists");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchAlbums = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:4000/api/albums");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchSingleTrack = (id) => {
  new Promise((resolve) => {
    const track = axios.get(`http://localhost:4000/tracks/${id}`);
    setTimeout(() => {
      resolve(track);
    }, 1000);
  });
};
