import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModelSelector from "./ModelSelector";
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>🔗 GitHub Repository</h2>
          <p style={{ color: '#4b5563' }}>Enter a GitHub repository URL to analyze</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
            GitHub Repository URL
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              {...register("url", {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/i,
                  message: "Enter a valid GitHub repo URL"
                }
              })}
              className="form-input"
              placeholder="https://github.com/owner/repository"
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                color: '#374151',
                transition: 'all 0.2s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
          {errors.url && (
            <p style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.875rem', 
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.url.message}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="gradient-button w-full"
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <div className="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div className="loading-spinner"></div>
              Analyzing Repository...
            </div>
          ) : (
            <div className="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Analyze Repository
            </div>
          )}
        </button>

        {parsed && (
          <div className="status-card status-success" style={{ marginTop: '1.5rem' }}>
            <div className="flex" style={{ alignItems: 'center', marginBottom: '0.75rem' }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold">Repository Found</h3>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <span className="block" style={{ opacity: 0.8 }}>Owner</span>
                <span className="font-medium">{parsed.owner}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                <span className="block" style={{ opacity: 0.8 }}>Repository</span>
                <span className="font-medium">{parsed.repo}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="status-card status-error" style={{ marginTop: '1.5rem' }}>
            <div className="flex" style={{ alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
      </form>

      {models && parsed && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <ModelSelector 
            models={models} 
            repoOwner={parsed.owner} 
            repoName={parsed.repo} 
          />
        </div>
      )}
    </div>
  );
}