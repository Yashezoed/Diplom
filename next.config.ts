import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	images: {
		domains: ['185.221.152.124'],
		unoptimized: true
	}
};

export default nextConfig;
