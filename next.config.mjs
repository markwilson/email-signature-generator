/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mustache/,
      loader: "mustache-loader",
    });

    return config;
  },

  output: "export",
};

export default nextConfig;
