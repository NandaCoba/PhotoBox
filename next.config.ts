import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = __dirname;

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: path.resolve(projectRoot),
  },
};

export default nextConfig;
