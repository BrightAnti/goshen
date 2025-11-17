/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ayzuwmakumxreexedlfc.supabase.co", "images.unsplash.com"],
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
