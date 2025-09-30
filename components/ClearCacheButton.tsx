import React, { useState } from "react";
import { clearModelCache } from "../lib/cache";

export default function ClearCacheButton() {
  const [cleared, setCleared] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClear() {
    setLoading(true);
    await clearModelCache();
    setLoading(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  }

  return (
    <button
      onClick={handleClear}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
    >
      {loading ? "Clearing..." : "Clear Model Cache"}
      {cleared && <span className="ml-2 text-green-700">✔</span>}
    </button>
  );
}
