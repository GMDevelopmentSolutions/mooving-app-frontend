import type { FC } from "react";
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./Map.module.scss";

import { Coordinates, Location } from "@/interface/interface";

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY || "";

interface Props {
	coordinates: Location;
	extraMarkers?: Coordinates[];
}

const Map: FC<Props> = ({ coordinates, extraMarkers = [] }) => {
	const { startLocation, finalDestination } = coordinates ?? {};

	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<maplibregl.Map | null>(null);
	const startMarker = useRef<maplibregl.Marker | null>(null);
	const endMarker = useRef<maplibregl.Marker | null>(null);
	const extraMarkersRef = useRef<maplibregl.Marker[]>([]);

	const start: { lon: number; lat: number } = {
		lon: startLocation?.longitude ?? 0,
		lat: startLocation?.latitude ?? 0,
	};
	const destination: { lon: number; lat: number } = {
		lon: finalDestination?.longitude ?? 0,
		lat: finalDestination?.latitude ?? 0,
	};

	useEffect(() => {
		if (mapContainer.current) {
			if (!map.current) {
				map.current = new maplibregl.Map({
					container: mapContainer.current,
					style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
					center: [start.lon, start.lat],
					zoom: 14,
				});

				startMarker.current = new maplibregl.Marker({ color: "#531BAF" })
					.setLngLat([start.lon, start.lat])
					.addTo(map.current);

				endMarker.current = new maplibregl.Marker({ color: "#14ae5c" })
					.setLngLat([destination.lon, destination.lat])
					.addTo(map.current);

				const routeCoordinates: [number, number][] = [
					[start.lon, start.lat],
					[destination.lon, destination.lat],
				];

				const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: routeCoordinates,
					},
					properties: {},
				};

				map.current.on("load", () => {
					map.current?.addSource("route", {
						type: "geojson",
						data: routeGeoJSON,
					});

					map.current?.addLayer({
						id: "routeLineLayer",
						type: "line",
						source: "route",
						layout: {
							"line-join": "round",
							"line-cap": "round",
						},
						paint: {
							"line-color": "#007AFF",
							"line-width": 4,
						},
					});

					const bounds = new maplibregl.LngLatBounds()
						.extend([start.lon, start.lat])
						.extend([destination.lon, destination.lat]);

					map.current?.fitBounds(bounds, {
						padding: 50,
						maxZoom: 14,
					});
				});
			} else {
				if (startMarker.current && start.lon) {
					startMarker.current.setLngLat([start.lon, start.lat]);
				}

				if (endMarker.current) {
					endMarker.current.setLngLat([destination.lon, destination.lat]);
				}

				const routeCoordinates: [number, number][] = [
					[start.lon, start.lat],
					[destination.lon, destination.lat],
				];

				const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
					type: "Feature",
					geometry: {
						type: "LineString",
						coordinates: routeCoordinates,
					},
					properties: {},
				};
				const routeSource = map.current.getSource("route");

				if (routeSource) {
					(routeSource as maplibregl.GeoJSONSource).setData(routeGeoJSON);
				}

				const bounds = new maplibregl.LngLatBounds()
					.extend([start.lon, start.lat])
					.extend([destination.lon, destination.lat]);

				map.current.fitBounds(bounds, {
					padding: 50,
					maxZoom: 14,
				});
			}
		}

		extraMarkersRef.current.forEach(marker => marker.remove());
		extraMarkersRef.current = extraMarkers.map(
			({ longitude: lng, latitude: lat }) => {
				const marker = new maplibregl.Marker({ color: "#FF0000" })
					.setLngLat([lng, lat])
					.addTo(map.current!);
				return marker;
			},
		);
	}, [
		start.lon,
		start.lat,
		destination.lon,
		destination.lat,
		extraMarkers,
		coordinates,
	]);

	if (!startLocation || !finalDestination) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div ref={mapContainer} className={styles.map} />
		</div>
	);
};

export default Map;
