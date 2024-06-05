import React from "react";
import { useEffect } from "react";
import { load } from "@2gis/mapgl";
import { Map, MapOptions } from "@2gis/mapgl/types";
import { MapWrapper } from "./wrapper";

export const Mapg = () => {
	useEffect(() => {
		let map: Map;
		load().then((mapglAPI) => {
			map = new mapglAPI.Map("map-container", {
				center: [55.31878, 25.23584],
				zoom: 13,
				key: "916a51a9-06da-48fb-bba4-c9073a4876cc",
			});
		});

		// Удаляем карту при размонтировании компонента
		return () => map && map.destroy();
	}, []);

	return (
		<div className='wr ' style={{ width: "100%", height: "100%" }}>
			<MapWrapper />
		</div>
	);
};
