"use client";

// Initialize MF Runtime immediately when this module loads
// This ensures it's ready before any components try to load remotes
import React from "react";
import ReactDOM from "react-dom";
import { createInstance } from "@module-federation/enhanced/runtime";

import { dependencies } from "../../package.json";

// Global instance variable
export let mfInstance: any = null;

// Synchronous initialization - createInstance is synchronous
if (typeof window !== "undefined") {
  try {
    mfInstance = createInstance({
      name: "app_router_host",
      remotes: [
        {
          name: "ui_library",
          alias: "ui-library",
          entry: "http://localhost:3001/mf-manifest.json",
        },
      ],
      shared: {
        react: {
          lib: () => React,
          version: dependencies.react,
          strategy: "loaded-first",
          shareConfig: {
            singleton: true,
            eager: false,
            requiredVersion: dependencies.react,
          },
        },
        "react-dom": {
          lib: () => ReactDOM,
          version: dependencies["react-dom"],
          strategy: "loaded-first",
          shareConfig: {
            singleton: true,
            eager: false,
            requiredVersion: dependencies["react-dom"],
          },
        },
      },
    });
    console.log("Module Federation Runtime initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Module Federation Runtime:", error);
  }
}
