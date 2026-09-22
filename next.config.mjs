/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: "/immo",
  transpilePackages: [
    // Browser-only: touches `self` at module scope. Left external, Next emits a
    // bare import() that Node's ESM loader evaluates during page-data
    // collection, throwing "self is not defined". Bundling keeps it inside
    // webpack, where it is only pulled in by client-side dynamic imports.
    "blitzdata.ts",
    "blitzdata-ui-manager",
    // antd & deps
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // blitzdata.ts and its UI manager are browser-only: they read `self` at
      // module scope, which throws during Next's server-side page-data
      // collection. Nothing here renders them on the server, so point `self` at
      // globalThis so the module can be evaluated harmlessly.
      config.plugins.push(
        new webpack.DefinePlugin({ self: "globalThis" })
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
