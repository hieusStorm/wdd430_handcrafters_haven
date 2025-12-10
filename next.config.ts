import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ← this points to the project folder
  },
};

export default nextConfig;
