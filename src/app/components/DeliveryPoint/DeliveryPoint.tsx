import styles from "./DeliveryPoint.module.scss";
import Btn from "../Btn/Btn";
import SpriteSVG from "../SpriteSVG/SpriteSVG";
import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { getCityAndStreet } from "@/utils/getCityAndStreet";
import BtnDelete from "../BtnDelete/BtnDelete";
import { useDispatch } from "react-redux";
import { removeStop } from "@/app/redux/slice/locationSlice";

const mapStyle =
	"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

interface DeliveryPointProps {
	id?: number;
	title: string;
	fill?: string;
	coordinates: [number, number] | null;
	onChangeLocation: (
		newLocation: [number, number],
		address: string,
		id?: number,
	) => void;
}

const DeliveryPoint = ({
	title,
	fill,
	onChangeLocation,
	coordinates,
	id,
}: DeliveryPointProps) => {
	const [showMap, setShowMap] = useState(false);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<maplibregl.Map | null>(null);
	const markerRef = useRef<maplibregl.Marker | null>(null);
	const [cityAndStreet, setCityAndStreet] = useState<string>("");
	const dispatch = useDispatch();

	const handleRemoveStop = () => {
		if (!id) return;
		dispatch(removeStop(id));
	};

	useEffect(() => {
		if (!coordinates || (coordinates[0] === 0 && coordinates[1] === 0)) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async position => {
						const { latitude, longitude } = position.coords;
						const address = await getCityAndStreet({ lat: latitude, lon: longitude });
						onChangeLocation([longitude, latitude], address, id ?? 0);
						setCityAndStreet(address);
					},
					() => {
						const defaultCoordinates: [number, number] = [30.5234, 50.4501];
						onChangeLocation(defaultCoordinates, "Default Location", id ?? 0);
						setCityAndStreet("Default Location");
					},
				);
			} else {
				const defaultCoordinates: [number, number] = [30.5234, 50.4501];
				onChangeLocation(defaultCoordinates, "Default Location", id ?? 0);
				setCityAndStreet("Default Location");
			}
		}
	}, [coordinates, onChangeLocation, id]);

	useEffect(() => {
		if (coordinates && mapContainerRef.current) {
			const [lng, lat] = coordinates;
			if (isNaN(lng) || isNaN(lat)) return;

			if (!mapRef.current) {
				mapRef.current = new maplibregl.Map({
					container: mapContainerRef.current,
					style: mapStyle,
					center: coordinates,
					zoom: 12,
				});

				markerRef.current = new maplibregl.Marker({ color: fill })
					.setLngLat(coordinates)
					.setPopup(new maplibregl.Popup().setText("You are here!"))
					.addTo(mapRef.current);

				mapRef.current.on("click", async event => {
					const { lng, lat } = event.lngLat;
					const address = await getCityAndStreet({ lat, lon: lng });
					setCityAndStreet(address);
					onChangeLocation([lng, lat], address as string, id ?? 0);
					markerRef.current?.setLngLat([lng, lat]);

					mapRef.current?.flyTo({
						center: [lng, lat],
						essential: true,
						speed: 0.5,
						curve: 1,
					});
				});
			} else {
				mapRef.current.flyTo({
					center: coordinates,
					essential: true,
					speed: 0.5,
					curve: 1,
				});

				markerRef.current?.setLngLat(coordinates);
			}
		}

		setShowMap(false);

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [coordinates, onChangeLocation, fill, id]);

	return (
		<>
			<div className={styles.deliveryPoint}>
				<h5>{title}</h5>
				<p>
					<span>
						<SpriteSVG href="icon-pin_drop" color={fill} />
						{cityAndStreet}
					</span>
					<span className={styles.btnContainer}>
						{id && <BtnDelete onClick={handleRemoveStop} />}
						<Btn onClick={() => setShowMap(!showMap)}>
							<SpriteSVG href="icon-arrow" />
						</Btn>
					</span>
				</p>
			</div>
			<div className={`${styles.mapContainer} ${showMap ? styles.showMap : ""}`}>
				<div className={styles.mapWrapper}>
					<div ref={mapContainerRef} className={styles.map} />
				</div>
			</div>
		</>
	);
};

export default DeliveryPoint;
