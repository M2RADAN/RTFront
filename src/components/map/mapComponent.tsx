import { useEffect } from "react";
import { Map, Marker } from "@2gis/mapgl/types";
import { load } from "@2gis/mapgl";
import { Clusterer } from "@2gis/mapgl-clusterer";
import { RulerControl } from "@2gis/mapgl-ruler";
import { Directions } from "@2gis/mapgl-directions";
import { MapWrapper } from "./MapWrapper";
import { useAppDispatch } from "../../services";
import { setLnglat } from "../../services/slices/note.slice";
import { clearLnglat } from "../../services/slices/note.slice";
import { setPoints } from "../../services/slices/note.slice";
export const MAP_CENTER = [55.31878, 25.23584];

export default function Mapgl() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const markers: Marker[] = [];
    type Ipoint = number[] | undefined;
    let firstPoint: Ipoint;
    let secondPoint: Ipoint;
    let thirdPoint: Ipoint;
    // A current selecting point
    let selecting = "a";

    let map: Map | null = null;
    let directions: Directions | null = null;
    let clusterer: Clusterer | null = null;

    load().then((mapgl) => {
      map = new mapgl.Map("map-container", {
        center: MAP_CENTER,
        zoom: 13,
        key: "a16f273e-6e8d-4584-9758-8e57f96503bf",
      });
      const controlsHtml = `<button id="reset">Reset points</button> `;
      new mapgl.Control(map, controlsHtml, {
        position: "topLeft",
      });
      const resetButton = document.getElementById("reset");
      if (!resetButton) return;
      resetButton.addEventListener("click", function () {
        selecting = "a";
        firstPoint = undefined;
        secondPoint = undefined;
        thirdPoint = undefined;
        markers.forEach((m) => {
          m.destroy();
        });
        dispatch(clearLnglat());
        if (!directions) return;
        directions.clear();
      });
      map.on("click", (e) => {
        const coords = e.lngLat;
        dispatch(setLnglat(e.lngLat));
        if (selecting != "end") {
          markers.push(
            // @ts-ignore
            new mapgl.Marker(map, {
              coordinates: coords,
              icon: "https://docs.2gis.com/img/dotMarker.svg",
            })
          );
        }

        if (selecting === "a") {
          firstPoint = coords;
          selecting = "b";
        } else if (selecting === "b") {
          secondPoint = coords;
          selecting = "c";
        } else if (selecting === "c") {
          thirdPoint = coords;
          selecting = "end";
        }

        // If all points are selected — we can draw the route
        if (firstPoint && secondPoint && thirdPoint && directions) {
          const notes = {
            fPoint: firstPoint,
            sPoint: secondPoint,
            tPoint: thirdPoint,
          };
          console.log(notes);
          dispatch(setPoints(notes));

          directions.carRoute({
            points: [firstPoint, secondPoint, thirdPoint],
          });
          markers.forEach((m) => {
            m.destroy();
          });
        }
      });

      // @ts-ignore
      const rulerControl = new RulerControl(map, { position: "centerRight" });

      directions = new Directions(map, {
        directionsApiKey: "916a51a9-06da-48fb-bba4-c9073a4876cc",
      });
    });

    // Destroy the map, if Map component is going to be unmounted
    return () => {
      directions?.clear();
      map?.destroy();
    };
  }, []);

  return (
    <>
      <MapWrapper />
    </>
  );
}
