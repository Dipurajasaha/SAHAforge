import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import type { ModelDescriptor } from "../lib/detectModel";

interface ModelSelectorProps {
  models: ModelDescriptor[];
  repoOwner: string;
  repoName: string;
}

export default function ModelSelector({ models, repoOwner, repoName }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState<ModelDescriptor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModelSelect = async (model: ModelDescriptor) => {
    setSelectedModel(model);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate loading the model
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResult(`✅ Model "${model.path}" loaded successfully! Configure inputs below.`);
    } catch (err) {
      setError(`❌ Failed to load model: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputsReady = (inputs: any) => {
    // Store inputs for inference
    console.log('Inputs ready:', inputs);
  };

  const handleRunInference = async () => {
    if (!selectedModel) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate inference
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(`🎉 Inference completed! Results would appear here in a real implementation.`);
    } catch (err) {
      setError(`❌ Inference failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getModelIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'onnx': return '🧠';
      case 'tensorflow.js': return '🔬';
      case 'hugging-face': return '🤗';
      default: return '⚡';
    }
  };

  const getModelColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'onnx': return { bg: '#e0f2fe', border: '#0369a1', text: '#0c4a6e' };
      case 'tensorflow.js': return { bg: '#f0f9ff', border: '#0284c7', text: '#0c4a6e' };
      case 'hugging-face': return { bg: '#fef3c7', border: '#d97706', text: '#92400e' };
      default: return { bg: '#f3e8ff', border: '#7c3aed', text: '#581c87' };
    }
  };

  if (!models.length) {
    return (
      <div className="glass-card">
        <div className="text-center">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#f59e0b' }}>
            No Supported Models Found
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            This repository doesn't contain any supported model files.
          </p>
          <div style={{ 
            background: '#fef3c7', 
            border: '1px solid #fed7aa', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            fontSize: '0.875rem',
            color: '#92400e'
          }}>
            <strong>Supported formats:</strong> .onnx (ONNX), model.json (TensorFlow.js), config.json (Hugging Face)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>
          🎯 Available Models ({models.length} found)
        </h2>
        <p style={{ color: '#4b5563' }}>
          Select a model to run inference
        </p>
      </div>

      <div className="grid" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {models.map((model, index) => {
          const colors = getModelColor(model.type);
          const isSelected = selectedModel?.path === model.path;
          
          return (
            <div
              key={index}
              onClick={() => handleModelSelect(model)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : colors.bg,
                border: `2px solid ${isSelected ? '#3b82f6' : colors.border}`,
                borderRadius: '1rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected ? '0 10px 25px rgba(59, 130, 246, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              className="model-card"
            >
              <div className="flex" style={{ alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', marginRight: '0.75rem' }}>
                  {getModelIcon(model.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ 
                    color: isSelected ? 'white' : colors.text,
                    marginBottom: '0.25rem'
                  }}>
                    {model.type.toUpperCase()}
                  </h3>
                  <p className="text-sm" style={{ 
                    color: isSelected ? 'rgba(255, 255, 255, 0.8)' : '#6b7280',
                    opacity: 0.9
                  }}>
                    {model.path.split('/').pop()}
                  </p>
                </div>
              </div>
              
              <div style={{ 
                background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace'
              }}>
                <strong style={{ color: isSelected ? 'white' : colors.text }}>Path:</strong>
                <br />
                <span style={{ color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#4b5563' }}>
                  {model.path}
                </span>
              </div>

              {isSelected && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>
                    ✨ Selected for execution
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="status-card" style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <div className="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className="loading-spinner"></div>
            <span className="font-medium">Loading model "{selectedModel?.path}"...</span>
          </div>
        </div>
      )}

      {/* Success Result */}
      {result && !isLoading && (
        <div className="status-card status-success">
          <div className="flex" style={{ alignItems: 'center' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{result}</span>
          </div>
        </div>
      )}

      {/* Model Interface - Show FormBuilder when model is loaded */}
      {selectedModel && result && !isLoading && (
        <div style={{ marginTop: '2rem' }}>
          <FormBuilder
            model={selectedModel}
            onInputsReady={handleInputsReady}
            onRunInference={handleRunInference}
          />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="status-card status-error">
          <div className="flex" style={{ alignItems: 'center' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Repository Info */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        <strong>Repository:</strong> {repoOwner}/{repoName} • <strong>Models found:</strong> {models.length}
      </div>
    </div>
  );
}