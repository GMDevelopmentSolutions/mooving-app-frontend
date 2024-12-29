import axios from "axios";

export const getCityAndStreetByCoordinates = async (
	lng: number,
	lat: number,
): Promise<string> => {
	const { data } = await axios.get(
		`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&lang=en`,
	);

	const city =
		data.address.city ||
		data.address.town ||
		data.address.village ||
		data.address.neighbourhood;
	const street =
		data.address.road || data.address.pedestrian || data.address.neighbourhood;
	const houseNumber = data.address.house_number;

	const fullAddress = `${street ? street + ", " : ""}${houseNumber ? houseNumber + ", " : ""}${city || ""}`;

	return fullAddress;
};
