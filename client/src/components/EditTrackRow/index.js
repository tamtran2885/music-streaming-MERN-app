import React from "react";

const EditTrackRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  // const { title, artist, album, reproductions, genre, _id } = track.track;
  // console.log(track);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100px" }}>. </div>
      <div style={{ width: "150px" }}>
        <img src="" alt="Img" style={{ width: "50px", height: "50px" }} />
      </div>
      <div style={{ width: "100px" }}>Star</div>
      <div style={{ width: "200px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        />
      </div>
      <div style={{ width: "200px" }}>
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={editFormData.artist}
          onChange={handleEditFormChange}
        />
      </div>
      <div style={{ width: "200px" }}>
        <input
          type="text"
          name="album"
          placeholder="Album"
          value={editFormData.album}
          onChange={handleEditFormChange}
        />
      </div>
      <div style={{ width: "100px" }}>
        <input
          type="number"
          name="reproductions"
          placeholder="Views"
          value={editFormData.reproductions}
          onChange={handleEditFormChange}
        />
      </div>
      <div style={{ width: "100px" }}>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={editFormData.genre}
          onChange={handleEditFormChange}
        />
      </div>
      <div style={{ width: "100px" }}>
        <input
          type="number"
          name="duration"
          placeholder="Duration"
          value={editFormData.duration}
          onChange={handleEditFormChange}
        />
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTrackRow;
