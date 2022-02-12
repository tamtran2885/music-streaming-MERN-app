import React, { useState, useEffect } from "react";
import PlaylistTrackRow from "../PlaylistTrackRow";
import axios from "axios";

const PlaylistTrackRows = ({ playlistTrack }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setTracks(playlistTrack);
  }, [playlistTrack, setTracks]);

  // const handleDelete = async (_id, playlistId) => {
  //   // console.log("delete" + _id);
  //   try {
  //     await axios.delete(`http://localhost:4000/api/tracks/${_id}?playlistId=${playlistId}`);
  //     console.log(_id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
              <PlaylistTrackRow
                key={track._id}
                track={track}
                // handleDelete={handleDelete}
              />
            </div>
          ))}
        {!tracks && <div>Loading...</div>}
      </div>
    </>
  );
};

export default PlaylistTrackRows;
