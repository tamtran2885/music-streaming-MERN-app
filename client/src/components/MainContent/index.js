import React from "react";

const MainContent = ({ children, ...props }) => {
  return <main {...props}>{children}</main>;
};

export default MainContent;
