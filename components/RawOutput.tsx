import React from "react";

interface RawOutputProps {
  output: any;
}

export default function RawOutput({ output }: RawOutputProps) {
  return (
    <div className="mt-4 p-2 border rounded bg-gray-100">
      <h2 className="font-semibold mb-2">Raw Output (Debug)</h2>
      <pre className="text-xs overflow-x-auto">{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
}
