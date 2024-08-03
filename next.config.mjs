import withYaml from "next-plugin-yaml";

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
  basePath: "/email-signature-generator",
};

export default withYaml(nextConfig);
