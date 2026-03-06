import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { dependencies } from "./package.json";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "ui_library",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.tsx",
        "./Card": "./src/Card.tsx",
        "./types": "./src/types.ts",
      },
      shared: {
        react: {
          singleton: true,
          eager: false,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          eager: false,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
  html: {
    title: "UI Library - Module Federation Provider",
  },
  server: {
    port: 3001,
    strictPort: true,
  },
  output: {
    distPath: {
      root: "dist",
    },
    // Set absolute URLs for assets in the manifest
    assetPrefix: process.env.PUBLIC_PATH || "http://localhost:3001/",
  },
  dev: {
    // Same for development
    assetPrefix: "http://localhost:3001/",
  },
});
