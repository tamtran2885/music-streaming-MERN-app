import React, { useState } from "react";
import ReadOnlyTrackRow from "../ReadOnlyTrackRow";
import EditTrackRow from "../EditTrackRow";
import { useSelector } from "react-redux";

import axios from "axios";
import { useAuth } from "../../context/authContext";

const TrackRows = () => {
  // take a token
  const { user } = useAuth();
  // const token = user.accessToken;

  // retrieve tracks from redux store
  const tracksByUser = useSelector(
    (state) => state.dashboard.tracksByUser.data
  );
  // console.log(tracksByUser);

  // Set state
  const [tracksInfo, setTracksInfo] = useState(tracksByUser);

  const [editRowId, setEditRowId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    artist: "",
    album: "",
    reproductions: "",
    genre: "",
    duration: "",
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleEditClick = (event, track) => {
    event.preventDefault();
    setEditRowId(track._id);

    const formValues = {
      title: track.title,
      artist: track.artist,
      album: track.album,
      reproductions: track.reproductions,
      genre: track.genre,
      duration: track.duration,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: "Bearer " + token,
      },
    };

    const formData = new FormData();
    formData.append("title", editFormData.title);
    formData.append("artist", editFormData.artist);
    formData.append("album", editFormData.album);
    formData.append("reproductions", editFormData.reproductions);
    formData.append("genre", editFormData.genre);
    formData.append("duration", editFormData.duration);

    try {
      await axios.put(`/api/tracks/edit/${editRowId}`, formData, config);
      // setTracksInfo(formData);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(editRowId);

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100px" }}>No. </div>
        <div style={{ width: "150px" }}>Image</div>
        <div style={{ width: "100px" }}>Star</div>
        <div style={{ width: "200px" }}>Title</div>
        <div style={{ width: "200px" }}>Artist</div>
        <div style={{ width: "200px" }}>Album</div>
        <div style={{ width: "100px" }}>Views</div>
        <div style={{ width: "100px" }}>Genre</div>
        <div style={{ width: "100px" }}>Duration</div>
        <div style={{ width: "200px" }}>Actions</div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {tracksInfo &&
          tracksInfo.map((track) => (
            <form onSubmit={handleEditFormSubmit}>
              <div style={{ marginTop: "20px" }}>
                {editRowId === track._id ? (
                  <EditTrackRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyTrackRow
                    key={track._id}
                    track={track}
                    handleEditClick={handleEditClick}
                  />
                )}
              </div>
            </form>
          ))}
      </div>
    </>
  );
};

export default TrackRows;
