import { FC, useEffect, useState } from "react";
import getApiData from "../map/UpdateRoute";
import React from "react";
export const RouteInfoComponent: FC = () => {
  const [mapData, setMapData] = useState<any>();
  const [flag, setFlag] = useState<any>("hide");
  useEffect(() => {
    if (flag === "show") {
      getApiData().then((r: any) => setMapData(r.result));
    }
  }, [flag]);

  // if (!mapData) return;
  // console.log(mapData);
  return (
    <div>
      <button onClick={() => setFlag("show")}>показать</button>
      <button onClick={() => setFlag("showall")}>показатьaaa</button>
      <button onClick={() => setFlag("hide")}>спрятать</button>
      {flag === "showall" && <p>{mapData[0].ui_total_duration}</p>}
      {flag === "showall" &&
        mapData[0].waypoints.map((el: any) => (
          <React.Fragment key={el.id}>
            <p>{el.original_point.lat}</p>
            <p>{el.original_point.lon}</p>
          </React.Fragment>
        ))}
      {/* <p>{mapData[0].waypoints[0].original_point.lat}</p> */}
    </div>
  );
};
