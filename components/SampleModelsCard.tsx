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
    <div className="glass-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>🚀 Try a Sample Model</h2>
        <p style={{ color: '#4b5563' }}>Quick start with pre-configured models</p>
      </div>
      
      <div className="sample-grid">
        {SAMPLES.map((sample, i) => (
          <a
            key={i}
            href={sample.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sample-card"
          >
            <div className="flex" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 className="font-bold text-lg mb-1">{sample.label}</h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {sample.type.toUpperCase()} Model
                </p>
              </div>
              <div className="text-2xl">
                🔗
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm" style={{ 
          color: '#6b7280', 
          background: '#f9fafb', 
          borderRadius: '0.5rem', 
          padding: '0.5rem 1rem',
          display: 'inline-block'
        }}>
          💡 Opens model file in a new tab for demo/testing
        </p>
      </div>
    </div>
  );
}
