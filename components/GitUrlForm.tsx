import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RepoFileList from "./RepoFileList";
import ModelDetectPreview from "./ModelDetectPreview";
import { getDefaultBranch, getRepoTree, RepoTreeItem } from "../lib/github";
import { detectModels, ModelDescriptor } from "../lib/detectModel";

interface ParsedRepo {
  owner: string;
  repo: string;
}

function parseGitHubUrl(url: string): ParsedRepo | null {
  const regex = /^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/)?$/i;
  const match = url.match(regex);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}

export default function GitUrlForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ url: string }>();
  const [parsed, setParsed] = useState<ParsedRepo | null>(null);
  const [files, setFiles] = useState<RepoTreeItem[] | null>(null);
  const [models, setModels] = useState<ModelDescriptor[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { url: string }) => {
    setError(null);
    setFiles(null);
    setModels(null);
    const result = parseGitHubUrl(data.url);
    setParsed(result);
    if (!result) return;
    setLoading(true);
    try {
      const branch = await getDefaultBranch(result.owner, result.repo);
      const tree = await getRepoTree(result.owner, result.repo, branch);
      setFiles(tree);
      const detected = detectModels(tree);
      setModels(detected);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch repo tree");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-8">
      <label className="block">
        GitHub Repo URL:
        <input
          type="text"
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/i,
              message: "Enter a valid GitHub repo URL"
            }
          })}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="https://github.com/owner/repo"
        />
      </label>
      {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Fetch</button>
      {parsed && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <div><strong>Owner:</strong> {parsed.owner}</div>
          <div><strong>Repo:</strong> {parsed.repo}</div>
        </div>
      )}
      {loading && <div className="text-blue-600">Loading repo files...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {files && <RepoFileList files={files} />}
      {models && <ModelDetectPreview models={models} />}
    </form>
  );
}
