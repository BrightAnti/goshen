const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ayzuwmakumxreexedlfc.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: process.env.EXPORT_MODE === "true",
  },
  // For static export to cPanel
  output: process.env.EXPORT_MODE === "true" ? "export" : undefined,
  // Disable server-side features when exporting
  ...(process.env.EXPORT_MODE === "true" && {
    trailingSlash: true,
  }),
};

module.exports = nextConfig;
