import axios from "axios";
// const token = sessionStorage.getItem("token");

// console.log(token);

export const fetchTracks = () =>
  new Promise((resolve) => {
    const tracks = axios.get("/api/tracks", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });

export const fetchPlaylists = () =>
  new Promise((resolve) => {
    const playlists = axios.get("/api/playlists", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      resolve(playlists);
    }, 1000);
  });

export const fetchAlbums = () =>
  new Promise((resolve) => {
    const albums = axios.get("/api/albums", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      resolve(albums);
    }, 1000);
  });

export const fetchSingleTrack = (_id) =>
  new Promise((resolve) => {
    const track = axios.get(`/api/tracks/${_id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      resolve(track);
    }, 1000);
  });

export const fetchTracksByUser = async (userUid) => {
  const userTracks = await axios.get(
    `/api/tracks/mine?firebaseUser=${userUid}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return userTracks;
};

export const fetchPlayListsByUser = (userUid, token) => {
  const userPlaylists = axios.get(
    `/api/playlists/mine?firebaseUser=${userUid}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return userPlaylists;
};

export const fetchAlbumsByUser = (userUid) => {
  const userAlbums = axios.get(
    `/api/albums/mine?firebaseUser=${userUid}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return userAlbums;
};

export const fetchPlaylistTracks = (playlistId) => {
  const playlistTracks = axios.get(
    `/api/playlists/details/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return playlistTracks;
};

export const fetchTracksBySearch = (searchQuery) => {
  const searchTracks = axios.get(
    `/api/tracks/search?searchQuery=${searchQuery || "none"
    }`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return searchTracks;
};

export const fetchFollowingPlaylistsByUser = (userId) => {
  const followingPlaylists = axios.get(
    `/api/playlists/getFollowing/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return followingPlaylists;
};
