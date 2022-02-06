import React from "react";

const ReadOnlyTrackRow = ({ track, handleEditClick }) => {
  const { title, artist, album, reproductions, genre, _id, duration } = track;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "100px" }}>. </div>
      <div style={{ width: "150px" }}>
        <img src="" alt="Img" style={{ width: "50px", height: "50px" }} />
      </div>
      <div style={{ width: "100px" }}>Star</div>
      <div style={{ width: "200px" }}>{title ? title : "N/A"}</div>
      <div style={{ width: "200px" }}>{artist ? artist : "N/A"}</div>
      <div style={{ width: "200px" }}>{album ? album : "N/A"}</div>
      <div style={{ width: "100px" }}>
        {reproductions ? reproductions : "N/A"}
      </div>
      <div style={{ width: "100px" }}>{genre ? genre : "N/A"}</div>
      <div style={{ width: "100px" }}>{duration ? duration : "N/A"}</div>
      <div style={{ width: "100px" }}>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, track)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ReadOnlyTrackRow;
