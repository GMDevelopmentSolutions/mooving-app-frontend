/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: "default",
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8080",
				pathname: "/**",
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
					},
				},
			],
		});
		return config;
	},
};

export default nextConfig;
