import { useEffect } from "react";
import { Map, Marker } from "@2gis/mapgl/types";
import { load } from "@2gis/mapgl";
import { Clusterer } from "@2gis/mapgl-clusterer";
import { RulerControl } from "@2gis/mapgl-ruler";
import { Directions } from "@2gis/mapgl-directions";
import { MapWrapper } from "./MapWrapper";
import { useAppDispatch } from "../../services";
import {
	setPoints,
	clearPoints,
	setLnglat,
	clearLnglat,
	IPoint,
} from "../../services/slices/note.slice";

export const MAP_CENTER = [55.31878, 25.23584];

export default function Mapgl() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const markers: Marker[] = [];
		let firstPoint: IPoint | undefined;
		let secondPoint: IPoint | undefined;
		let thirdPoint: IPoint | undefined;
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
			const controlsHtml2 = `<button id="submit">Submit points</button> `;
			new mapgl.Control(map, controlsHtml, {
				position: "topLeft",
			});
			new mapgl.Control(map, controlsHtml2, {
				position: "topRight",
			});
			const resetButton = document.getElementById("reset");
			const submitButton = document.getElementById("submit");

			function reset() {
				selecting = "a";
				firstPoint = undefined;
				secondPoint = undefined;
				thirdPoint = undefined;
				markers.forEach((m) => {
					m.destroy();
				});
				dispatch(clearLnglat());
				dispatch(clearPoints());
				if (!directions) return;
				directions.clear();
			}

			if (!resetButton) return;
			resetButton.addEventListener("click", function () {
				reset();
			});

			map.on("click", (e) => {
				const coords: IPoint = { lon: e.lngLat[0], lat: e.lngLat[1] };
				dispatch(setLnglat(e.lngLat));
				if (selecting != "end") {
					markers.push(
						// @ts-ignores

						new mapgl.Marker(map, {
							coordinates: coords,
							icon: "../../../src/img/dotMarker.svg",
						})
					);
					console.log("markers :", markers);
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

				if (!submitButton) return;
				submitButton.addEventListener("click", function () {
					if (firstPoint && secondPoint && directions && !thirdPoint) {
						directions.carRoute({
							points: [Object.values(firstPoint), Object.values(secondPoint)],
						});
						markers.forEach((m) => {
							m.destroy();
						});
						const notes = {
							fPoint: firstPoint,
							sPoint: secondPoint,
							tPoint: thirdPoint,
						};
						console.log(notes);
						dispatch(setPoints(notes));
					} else if (firstPoint && secondPoint && directions && thirdPoint) {
						directions.carRoute({
							points: [
								Object.values(firstPoint),
								Object.values(secondPoint),
								Object.values(thirdPoint),
							],
						});
						markers.forEach((m) => {
							m.destroy();
						});
						const notes = {
							fPoint: firstPoint,
							sPoint: secondPoint,
							tPoint: thirdPoint,
						};
						console.log(notes);
						dispatch(setPoints(notes));
					}

					reset();
				});
				// If all points are selected — we can draw the route
				// if (firstPoint && secondPoint && thirdPoint && directions) {
				// 	const notes = {
				// 		fPoint: firstPoint,
				// 		sPoint: secondPoint,
				// 		tPoint: thirdPoint,
				// 	};
				// 	console.log(notes);
				// 	dispatch(setPoints(notes));

				// 	directions.carRoute({
				// 		points: [
				// 			Object.values(firstPoint),
				// 			Object.values(secondPoint),
				// 			Object.values(thirdPoint),
				// 		],
				// 	});
				// 	markers.forEach((m) => {
				// 		m.destroy();
				// 	});
				// }
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
