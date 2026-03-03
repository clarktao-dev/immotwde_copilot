import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  i18n: {
    locales: ["zh-TW", "de", "en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["api.mapbox.com", "images.unsplash.com"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
