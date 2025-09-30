import React from "react";

interface SampleModelButtonProps {
  onLoad: (url: string, type: "onnx" | "tfjs") => void;
}

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

export default function SampleModelButton({ onLoad }: SampleModelButtonProps) {
  return (
    <div className="my-4">
      <div className="font-semibold mb-2">Load Sample Model:</div>
      {SAMPLES.map((s, i) => (
        <button
          key={i}
          onClick={() => onLoad(s.url, s.type)}
          className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
