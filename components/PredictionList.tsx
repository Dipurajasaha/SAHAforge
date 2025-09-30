import React from "react";

interface PredictionListProps {
  predictions: Array<{ label: string; score: number }>;
}

export default function PredictionList({ predictions }: PredictionListProps) {
  return (
    <div className="mt-4 p-2 border rounded bg-green-50">
      <h2 className="font-semibold mb-2">Predictions</h2>
      <ul>
        {predictions.map((p, i) => (
          <li key={i} className="mb-1">
            <strong>{p.label}:</strong> {p.score.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
}
