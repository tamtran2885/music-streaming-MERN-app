import React, { useState, useEffect } from "react";

import PlaylistTrackRow from "../PlaylistTrackRow";

const PlaylistTrackRows = ({ playlistTrack }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(playlistTrack);
  }, [playlistTrack, setTracks]);

  return (
    <>
      <div className="trackrow__absolute">
        {/* <form>
          <div style={{ marginTop: "20px" }}>
            <PlaylistTrackRow />
          </div>
        </form> */}
        {tracks &&
          tracks.map((track) => (
            <div style={{ marginTop: "20px" }}>
              <PlaylistTrackRow key={track._id} track={track} />
            </div>
          ))}
        {!tracks && <div>Loading...</div>}
      </div>
    </>
  );
};

export default PlaylistTrackRows;
