export default function getApiData() {
  return fetch(
    "https://routing.api.2gis.com/carrouting/6.0.0/global?key=916a51a9-06da-48fb-bba4-c9073a4876cc",
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
          {
            lat: 55.072470687600536,
            lon: 83.04634094238281,
          },
        ],
        sources: [0, 1],
        targets: [2, 3],
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error("error", err));
}

//
