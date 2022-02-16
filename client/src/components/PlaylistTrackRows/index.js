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

  const sortTracks = () => {
    if (tracks) {
      return [...tracks].sort((a, b) => b.reproductions - a.reproductions);
    }
    return;
  };

  return (
    <>
      <div className="tracks__display">
        <div className="trackrow__absolute">
          <div className="songs__container">
            {[...Array(trackNumber())].map((e, i) => (
              <div className="position" key={i}>
                <OrderNumber i={i} />
              </div>
            ))}
            <div className="track">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistTrackRows;
