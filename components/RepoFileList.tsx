import React from "react";
import type { RepoTreeItem } from "../lib/github";

interface RepoFileListProps {
  files: RepoTreeItem[];
}

export default function RepoFileList({ files }: RepoFileListProps) {
  return (
    <div className="max-h-64 overflow-y-auto border rounded p-2 bg-white mt-4">
      <h2 className="font-semibold mb-2">Files in Repo</h2>
      <ul className="text-sm">
        {files.map((file) => (
          <li key={file.path} className="py-0.5 border-b last:border-b-0">
            {file.path}
          </li>
        ))}
      </ul>
    </div>
  );
}
