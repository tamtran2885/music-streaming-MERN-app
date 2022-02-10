import React from "react";
import "../assets/style/Skeleton.scss";

const SkeletonElements = ({ type }) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};

export default SkeletonElements;
