import React from "react";

const SAMPLES = [
  {
    label: "ONNX: MobileNetV2",
    url: "https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-7.onnx",
    type: "onnx" as const,
  },
  {
    label: "TF.js: MobileNet",
    url: "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json",
    type: "tfjs" as const,
  },
];

export default function SampleModelsCard() {
  return (
    <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded shadow-sm">
      <div className="font-semibold mb-2">Try a Sample Model:</div>
      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            {s.label}
          </a>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-500">Loads model file in a new tab for demo/testing.</div>
    </div>
  );
}
