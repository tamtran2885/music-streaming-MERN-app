import React from "react";

import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent"

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

function withLayout(WrappedComponent) {
    WrappedComponent.displayName = `withLayout(${getDisplayName(
      WrappedComponent,
    )})`;
  
    function WrapperComponent({ ...props }) {
      return (
        <>
          <MainContent
            className={props.fullWidth ? "container-fluid" : "container"}
          >
            <WrappedComponent {...props} />
          </MainContent>
        </>
      );
    }
    return WrapperComponent;
  }
  
  export default withLayout;

