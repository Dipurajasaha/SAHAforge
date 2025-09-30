import React from "react";

interface ImageUploaderProps {
  onImage: (file: File) => void;
}

export default function ImageUploader({ onImage }: ImageUploaderProps) {
  return (
    <div className="my-4">
      <label className="block font-medium mb-1">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            onImage(e.target.files[0]);
          }
        }}
        className="block border rounded px-3 py-2"
      />
    </div>
  );
}
