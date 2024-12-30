import React, { useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Polyline,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";

type RouteMapProps = {
	startCoords: [number, number]; //  [lat, lng]
	endCoords: [number, number]; // [lat, lng]
};

const CenterMap: React.FC<{
	startCoords: [number, number];
	endCoords: [number, number];
}> = ({ startCoords, endCoords }) => {
	const map = useMap();
	useEffect(() => {
		const bounds = new L.LatLngBounds([startCoords, endCoords]);
		map.fitBounds(bounds, { padding: [10, 10] });
	}, [startCoords, endCoords, map]);

	return null;
};

const RouteMap: React.FC<RouteMapProps> = ({ startCoords, endCoords }) => {
	const customIcon = new Icon({
		iconUrl: "/img/placeholder.png",
		iconSize: [32, 32],
		iconAnchor: [16, 32],
	});

	return (
		<MapContainer
			center={startCoords}
			zoom={13}
			style={{ height: "30vh", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={startCoords} icon={customIcon} />
			<Marker position={endCoords} icon={customIcon} />
			<Polyline positions={[startCoords, endCoords]} color="blue" />

			<CenterMap startCoords={startCoords} endCoords={endCoords} />
		</MapContainer>
	);
};

export default RouteMap;
