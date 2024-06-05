import { FC, useEffect, useState } from "react";
import getApiData from "../map/UpdateRoute";
import React from "react";
export const RouteInfoComponent: FC = () => {
  const [mapData, setMapData] = useState<any>();

  useEffect(() => {
    getApiData().then((r: any) => setMapData(r.result));
  }, []);

  if (!mapData) return;
  console.log(mapData);
  return (
    <div>
      <p>{mapData[0].ui_total_duration}</p>
      {mapData[0].maneuvers.map((el: any) => (
        <React.Fragment key={el.id}>
          <p>{el.comment}</p>
          <p>{el.outcoming_path_comment}</p>
        </React.Fragment>
      ))}
    </div>
  );
};
