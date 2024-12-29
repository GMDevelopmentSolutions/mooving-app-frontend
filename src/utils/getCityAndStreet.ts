import axios from "axios";

export const getCityAndStreet = async ({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): Promise<string> => {
	try {
		if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
			throw new Error(`Invalid coordinates: lat=${lat}, lng=${lon}`);
		}

		const { data } = await axios.get(
			`https://nominatim.openstreetmap.org/reverse`,
			{
				params: {
					lat,
					lon,
					format: "json",
					"accept-language": "en",
				},
			},
		);

		return data?.display_name || "Unknown location";
	} catch {
		return "Failed to fetch location";
	}
};
