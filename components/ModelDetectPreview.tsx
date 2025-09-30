import React from "react";
import type { ModelDescriptor } from "../lib/detectModel";

interface ModelDetectPreviewProps {
  models: ModelDescriptor[];
}

export default function ModelDetectPreview({ models }: ModelDetectPreviewProps) {
  if (!models.length) {
    return <div className="mt-4 p-2 border rounded bg-yellow-50">No supported models detected.</div>;
  }
  return (
    <div className="mt-4 p-2 border rounded bg-green-50">
      <h2 className="font-semibold mb-2">Detected Models</h2>
      <ul>
        {models.map((m, i) => (
          <li key={i} className="mb-1">
            <strong>Type:</strong> {m.type} <span className="ml-2"><strong>Path:</strong> {m.path}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
