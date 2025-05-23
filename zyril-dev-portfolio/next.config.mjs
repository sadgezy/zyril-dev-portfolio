/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    basePath: "/zyril-dev-portfolio",
    assetPrefix: "/zyril-dev-portfolio/",
};

export default nextConfig;
