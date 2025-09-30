import React from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-4 p-2 border rounded bg-red-100 text-red-700">
      <strong>Error:</strong> {message}
    </div>
  );
}
