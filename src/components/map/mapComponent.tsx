import { useEffect } from "react";
import { Map } from "@2gis/mapgl/types";
import { load } from "@2gis/mapgl";
import { Clusterer } from "@2gis/mapgl-clusterer";
import { RulerControl } from "@2gis/mapgl-ruler";
import { Directions } from "@2gis/mapgl-directions";
import { MapWrapper } from "./MapWrapper";

export const MAP_CENTER = [55.31878, 25.23584];

export default function Mapgl() {
  useEffect(() => {
    let map: Map | null = null;
    let directions: Directions | null = null;
    let clusterer: Clusterer | null = null;

    load().then((mapgl) => {
      map = new mapgl.Map("map-container", {
        center: MAP_CENTER,
        zoom: 13,
        key: "916a51a9-06da-48fb-bba4-c9073a4876cc",
      });

      map.on("click", (e) => console.log(e));

      /**
       * Ruler  plugin
       */

      // @ts-ignore
      const rulerControl = new RulerControl(map, { position: "centerRight" });

      /**
       * Clusterer plugin
       */

      clusterer = new Clusterer(map, {
        radius: 60,
      });
      const markers = [
        { coordinates: [55.27887, 25.21001] },
        { coordinates: [55.30771, 25.20314] },
        { coordinates: [55.35266, 25.24382] },
      ];
      clusterer.load(markers);

      /**
       * Directions plugin
       */

      directions = new Directions(map, {
        directionsApiKey: "916a51a9-06da-48fb-bba4-c9073a4876cc", // It's just demo key
      });
      directions.carRoute({
        points: [
          [55.28273111108218, 25.234131928828333],
          [55.35242563034581, 25.23925607042088],
        ],
      });
    });

    // Destroy the map, if Map component is going to be unmounted
    return () => {
      directions?.clear();
      clusterer?.destroy();
      map?.destroy();
    };
  }, []);

  return (
    <>
      <MapWrapper />
    </>
  );
}
