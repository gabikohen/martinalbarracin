/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // 👈 fuerza que cada página sea /carpeta/index.html
};

export default nextConfig;