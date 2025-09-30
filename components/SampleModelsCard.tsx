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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🚀 Try a Sample Model</h2>
        <p className="text-gray-600">Quick start with pre-configured models</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {SAMPLES.map((sample, i) => (
          <a
            key={i}
            href={sample.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">{sample.label}</h3>
                <p className="text-blue-100 text-sm opacity-90">
                  {sample.type.toUpperCase()} Model
                </p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">
                🔗
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2 inline-block">
          💡 Opens model file in a new tab for demo/testing
        </p>
      </div>
    </div>
  );
}
