import React, { useState, useEffect } from "react";
import PlaylistTrackRow from "../PlaylistTrackRow";
import OrderNumber from "../OrderNumber";

const PlaylistTrackRows = ({ playlistTrack, playlistInfo }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(playlistTrack);
  }, [playlistTrack, setTracks]);

  const trackNumber = () => {
    if (tracks) {
      return tracks.length;
    }
    return;
  };

  // console.log(tracks);
  // console.log(playlistInfo);

  const sortTracks = () => {
    if (tracks) {
      return [...tracks].sort((a, b) => b.reproductions - a.reproductions);
    }
    return;
  };

  return (
    <>
      <div className="trackrow__absolute">
        {[...Array(trackNumber())].map((e, i) => (
          <div key={i}>
            <OrderNumber i={i} />
          </div>
        ))}
        {sortTracks() &&
          sortTracks().map((track) => (
            <div style={{ marginTop: "20px" }}>
              <PlaylistTrackRow
                key={track._id}
                track={track}
                playlistInfo={playlistInfo}
              />
            </div>
          ))}
        {!tracks && <div>Loading...</div>}
      </div>
    </>
  );
};

export default PlaylistTrackRows;
