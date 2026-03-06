"use client";

import dynamicImport from "next/dynamic";
import { loadRemoteComponent } from "@/config/mf-runtime";

export const dynamic = "force-dynamic";

interface RemoteButtonProps {
  label: string;
  onClick?: () => void;
}

const RemoteButton = dynamicImport(
  () =>
    loadRemoteComponent("ui-library", "Button")
      .then((module: any) => ({ default: module.Button || module.default }))
      .catch((error) => {
        console.error("Failed to load RemoteButton:", error);
        throw error;
      }),
  { loading: () => <p>Loading remote component...</p>, ssr: false },
) as React.ComponentType<RemoteButtonProps>;

export default function RemoteComponentPage() {
  return (
    <div>
      <h1>Remote Component Page</h1>
      <p>This page demonstrates loading a component from the UI library.</p>
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #e5e7eb",
        }}
      >
        <RemoteButton
          label="Click me from Remote!"
          onClick={() => console.log("Remote button clicked!")}
        />
      </div>
    </div>
  );
}
