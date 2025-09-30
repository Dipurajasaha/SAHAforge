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
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as Record<string, unknown>).response === 'object' &&
        (err as { response?: { data?: { message?: string } } }).response?.data?.message
      ) {
        setError((err as { response: { data: { message: string } } }).response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch repo tree");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🔗 GitHub Repository</h2>
          <p className="text-gray-600">Enter a GitHub repository URL to analyze</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Repository URL
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("url", {
                  required: "URL is required",
                  pattern: {
                    value: /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/i,
                    message: "Enter a valid GitHub repo URL"
                  }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                placeholder="https://github.com/owner/repository"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
            {errors.url && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.url.message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Repository...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analyze Repository
              </div>
            )}
          </button>
        </div>

        {parsed && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mt-6">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800">Repository Found</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <span className="text-gray-500 block">Owner</span>
                <span className="font-medium text-gray-800">{parsed.owner}</span>
              </div>
              <div className="bg-white rounded-lg p-3">
                <span className="text-gray-500 block">Repository</span>
                <span className="font-medium text-gray-800">{parsed.repo}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 font-medium">{error}</span>
            </div>
          </div>
        )}
      </form>

      {files && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <RepoFileList files={files} />
        </div>
      )}

      {models && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <ModelDetectPreview models={models} />
        </div>
      )}
    </div>
  );
}
