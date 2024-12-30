/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: "default",
		domains: [process.env.NEXT_PUBLIC_API_URL],
		remotePatterns: [
			{
				protocol: process.env.NEXT_PUBLIC_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_HOSTNAME,
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
