import React from "react";
import "./Map.css";

export const MapWrapper = React.memo(
  () => {
    return <div id="map-container"></div>;
  },
  () => true
);
