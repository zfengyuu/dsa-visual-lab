/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@dsa-visual-lab/shared-types",
    "@dsa-visual-lab/lessons",
    "@dsa-visual-lab/visualizer-core"
  ]
};

export default nextConfig;
