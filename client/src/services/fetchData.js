import axios from "axios";

export const fetchTracks = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:3004/tracks");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchPlaylists = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:3004/playlists");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchAlbums = () =>
  new Promise((resolve) => {
    const tracks = axios.get("http://localhost:3004/albums");
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchSingleTrack = (id) => {
  new Promise((resolve) => {
    const track = axios.get(`http://localhost:3004/tracks/${id}`);
    setTimeout(() => {
      resolve(track);
    }, 1000);
  });
};
