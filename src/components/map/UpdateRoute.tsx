import { useAppSelector } from "../../services";
import { IPoint } from "../../services/slices/note.slice";
export default function getApiData() {
  return fetch(
    "https://routing.api.2gis.com/carrouting/6.0.0/global?key=a16f273e-6e8d-4584-9758-8e57f96503bf",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: [
          {
            lat: 54.99770587584445,
            lon: 82.79502868652345,
          },
          {
            lat: 54.99928130973027,
            lon: 82.92137145996095,
          },
          {
            lat: 55.04533538802211,
            lon: 82.98179626464844,
          },
        ],
        sources: [0],
        targets: [1, 2],
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error("error", err));
}

//
