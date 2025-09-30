import React from "react";

interface TextInputProps {
  label?: string;
  onText: (text: string) => void;
}

export default function TextInput({ label = "Input Text", onText }: TextInputProps) {
  return (
    <div className="my-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        onChange={e => onText(e.target.value)}
        className="block border rounded px-3 py-2 w-full"
        placeholder="Enter text..."
      />
    </div>
  );
}
