import React from "react";

interface CSVUploaderProps {
  onCSV: (file: File) => void;
}

export default function CSVUploader({ onCSV }: CSVUploaderProps) {
  return (
    <div className="my-4">
      <label className="block font-medium mb-1">Upload CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            onCSV(e.target.files[0]);
          }
        }}
        className="block border rounded px-3 py-2"
      />
    </div>
  );
}
