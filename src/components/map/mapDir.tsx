import React, { useState, useEffect, useRef } from "react";
import { Map, Marker, Control } from "@2gis/mapgl/types";
import mapgl from  "@2gis/mapgl"
import { Directions } from "@2gis/mapgl-directions";
interface Props {
  apiKey: string;
  directionsApiKey: string;
}

const MapGLDirectionsExample: React.FC<Props> = ({
  apiKey,
  directionsApiKey,
}) => {
  const mapRef = useRef<Map | null>(null);
  const [firstPoint, setFirstPoint] = useState<mapgl.LngLat | null>(null);
  const [secondPoint, setSecondPoint] = useState<mapgl.LngLat | null>(null);
  const [selecting, setSelecting] = useState<"a" | "b" | "end">("a");
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const map = new Map("map-container", {
      center: [55.31878, 25.23584],
      zoom: 13,
      key: apiKey,
    });
    mapRef.current = map;

    const directions = new Directions(map, { directionsApiKey });

    map.on("click", (e) => {
      const coords = e.lngLat;

      if (selecting !== "end") {
        setMarkers((prev) => [
          ...prev,
          new Marker(map, {
            coordinates: coords,
            icon: "https://docs.2gis.com/img/dotMarker.svg",
          }),
        ]);
      }

      if (selecting === "a") {
        setFirstPoint(coords);
        setSelecting("b");
      } else if (selecting === "b") {
        setSecondPoint(coords);
        setSelecting("end");
      }

      if (firstPoint && secondPoint) {
        directions.carRoute({ points: [firstPoint, secondPoint] });
        setMarkers([]);
      }
    });

    return () => {
      map.destroy();
    };
  }, [apiKey, directionsApiKey]);

  const handleReset = () => {
    setSelecting("a");
    setFirstPoint(null);
    setSecondPoint(null);
    mapRef.current?.off("click"); // Prevent click event handlers after reset
    mapRef.current?.removeChildren(); // Remove all map children
  };

  return (
    <div>
      <div id="map-container" style={{ width: "100%", height: "600px" }} />
      <button id="reset" onClick={handleReset}>
        Reset points
      </button>
    </div>
  );
};

export default MapGLDirectionsExample;
