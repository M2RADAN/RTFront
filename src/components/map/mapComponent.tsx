import { useEffect, useState } from "react";
import { Map, Marker } from "@2gis/mapgl/types";
import { load } from "@2gis/mapgl";
import { RulerControl } from "@2gis/mapgl-ruler";
import { Directions } from "@2gis/mapgl-directions";
import { MapWrapper } from "./MapWrapper";
import { useAppDispatch, useAppSelector } from "../../services";
import { setPoints, clearPoints, IPoint } from "../../services/slices/note.slice";

export const MAP_CENTER = [131.883506, 43.117337];

export default function Mapgl() {
	const dispatch = useAppDispatch();
	const [checkoutInfo] = useAppSelector((s) => s.route.checkoutRouteInfo) || [];

	const checkoutPoints = useAppSelector((s) => s.route.checkoutPoints) || [];

	const [directionsState, setDirections] = useState<Directions | null>(null);

	useEffect(() => {
		if (!checkoutInfo?.waypoints) return;
		directionsState?.carRoute({
			points: checkoutPoints.map((el) => Object.values(el)),
		});
		// Врубай
	}, [checkoutInfo?.waypoints, directionsState]);

	useEffect(() => {
		let markers: Marker[] = [];
		// A current selecting point

		let map: Map | null = null;
		let directions: Directions | null = null;
		let points: IPoint[] = [];

		load().then((mapgl) => {
			map = new mapgl.Map("map-container", {
				center: MAP_CENTER,
				zoom: 13,
				key: "e5fefe22-8131-439b-829f-c3d61be60e08",
			});

			const controlsHtml = `<button classname ="reset" id="reset">Удалить точки</button> `;
			const controlsHtml2 = `<button classname ="submit" id="submit">Сохранить маршрут</button> `;
			new mapgl.Control(map, controlsHtml, {
				position: "topRight",
			});
			new mapgl.Control(map, controlsHtml2, {
				position: "topRight",
			});
			const resetButton = document.getElementById("reset");
			const submitButton = document.getElementById("submit");
			function reset() {
				points = [];
				markers.forEach((m) => {
					m.destroy();
				});
				markers = [];
				if (!directions) return;
				directions.clear();
			}

			if (!resetButton) return;
			resetButton.addEventListener("click", function () {
				dispatch(clearPoints());
				reset();
			});

			map.on("click", (e) => {
				if (location.pathname != "/edit") return;
				const coords: IPoint = { lon: e.lngLat[0], lat: e.lngLat[1] };
				if (markers.length < 4) {
					markers.push(
						new mapgl.Marker(map!, {
							coordinates: Object.values(coords),
							icon: "https://docs.2gis.com/img/dotMarker.svg",
						})
					);
				}

				if (points.length < 4) {
					points.push(coords);
				}

				if (!submitButton) return;
				submitButton.addEventListener("click", function () {
					if (points.length < 2) return;

					directions?.carRoute({
						points: points.map((el) => Object.values(el)),
					});
					markers.forEach((m) => {
						m.destroy();
					});
					dispatch(setPoints(points));
				});
			});

			// @ts-ignore
			// const rulerControl = new RulerControl(map, { position: "centerRight" });

			directions = new Directions(map, {
				directionsApiKey: "e5fefe22-8131-439b-829f-c3d61be60e08",
			});
			setDirections(directions);
		});
		// Destroy the map, if Map component is going to be unmounted
		return () => {
			directions?.clear();
			map?.destroy();
		};
	}, []);

	return <MapWrapper />;
}
