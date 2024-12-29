import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

const config = {
	baseURL: url,
	withCredentials: true,
};

const instance = axios.create(config);

instance.interceptors.request.use(
	config => {
		if (!config.params) {
			config.params = {};
		}
		config.params.useCookies = true;

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export default instance;
