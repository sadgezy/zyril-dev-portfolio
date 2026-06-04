/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Add this block to disable server-side image optimization
  images: {
    unoptimized: true,
  },

  // Note: Keep your basePath here if you added it in the previous step!
  // basePath: '/zyril-dev-portfolio', 
};

export default nextConfig;