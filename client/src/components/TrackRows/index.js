import React, { useState, useEffect } from "react";
import ReadOnlyTrackRow from "../ReadOnlyTrackRow";
import EditTrackRow from "../EditTrackRow";
import { useDispatch } from "react-redux";
import OrderNumber from "../OrderNumber";

import axios from "axios";
import { getAllTracks, getTracksByUser } from "../../redux/track/actions";

const TrackRows = ({ totalTracks }) => {
  const dispatch = useDispatch();
  // get token
  const loggedToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  // Set state
  const [tracksInfo, setTracksInfo] = useState([]);
  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    setTracksInfo(totalTracks);
  }, [totalTracks]);

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

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + loggedToken,
    },
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", editFormData.title);
    formData.append("artist", editFormData.artist);
    formData.append("album", editFormData.album);
    formData.append("reproductions", editFormData.reproductions);
    formData.append("genre", editFormData.genre);
    formData.append("duration", editFormData.duration);

    try {
      await axios.put(`/api/tracks/edit/${editRowId}`, formData, config);
      setEditRowId(null);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(editRowId);

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleDelete = async (_id) => {
    // console.log("delete" + _id);
    try {
      await axios.delete(`http://localhost:4000/api/tracks/${_id}`, config);
      dispatch(getAllTracks());
      dispatch(getTracksByUser(userId));
      console.log(_id);
    } catch (err) {
      console.log(err);
    }
  };

  const trackNumber = () => {
    if (tracksInfo) {
      return tracksInfo.length;
    }
    return;
  };

  const sortTracks = () => {
    if (tracksInfo) {
      return [...tracksInfo].sort((a, b) => b.reproductions - a.reproductions);
    }
    return;
  };

  // console.log(trackNumber());

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
                    handleDelete={handleDelete}
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
