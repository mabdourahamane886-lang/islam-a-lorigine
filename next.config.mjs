/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export lets Capacitor bundle the same site as the Android app.
  // Keep the Cloudflare Worker production proxy untouched.
  output: "export",
  poweredByHeader: false,
  images: { unoptimized: true },
  trailingSlash: true
};

export default nextConfig;
