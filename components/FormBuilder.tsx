import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import TextInput from "./TextInput";
import type { ModelDescriptor } from "../lib/detectModel";

interface ModelInputs {
  images?: { [key: string]: { imageData: ImageData; file: File } };
  texts?: { [key: string]: { text: string; tokens?: number[] } };
  isReady: boolean;
}

interface FormBuilderProps {
  model: ModelDescriptor;
  onInputsReady: (inputs: ModelInputs) => void;
  onRunInference: () => void;
}

export default function FormBuilder({ model, onInputsReady, onRunInference }: FormBuilderProps) {
  const [inputs, setInputs] = useState<ModelInputs>({
    images: {},
    texts: {},
    isReady: false
  });
  const [isRunning, setIsRunning] = useState(false);

  const updateInputs = (newInputs: Partial<ModelInputs>) => {
    const updated = { ...inputs, ...newInputs };
    
    // Check if all required inputs are ready
    const hasRequiredInputs = checkInputsReady(updated);
    updated.isReady = hasRequiredInputs;
    
    setInputs(updated);
    onInputsReady(updated);
  };

  const checkInputsReady = (currentInputs: ModelInputs): boolean => {
    // Basic readiness check - can be enhanced based on model requirements
    const hasImages = Object.keys(currentInputs.images || {}).length > 0;
    const hasTexts = Object.keys(currentInputs.texts || {}).length > 0;
    
    // For now, require at least one input type
    return hasImages || hasTexts;
  };

  const handleImageLoad = (imageData: ImageData, file: File) => {
    updateInputs({
      images: { ...inputs.images, main: { imageData, file } }
    });
  };

  const handleTextChange = (text: string, tokens?: number[]) => {
    updateInputs({
      texts: { ...inputs.texts, main: { text, tokens } }
    });
  };

  const handleRunInference = async () => {
    setIsRunning(true);
    try {
      await onRunInference();
    } finally {
      setIsRunning(false);
    }
  };

  const getModelInputType = () => {
    // Determine input type based on model type and path
    const modelPath = model.path.toLowerCase();
    
    if (modelPath.includes('mobilenet') || modelPath.includes('resnet') || 
        modelPath.includes('inception') || modelPath.includes('efficientnet') ||
        model.type === 'onnx') {
      return 'image';
    }
    
    if (modelPath.includes('bert') || modelPath.includes('gpt') || 
        modelPath.includes('text') || modelPath.includes('nlp')) {
      return 'text';
    }
    
    // Default to image for most ML models
    return 'image';
  };

  const getExpectedImageSize = () => {
    const modelPath = model.path.toLowerCase();
    
    if (modelPath.includes('224')) return { width: 224, height: 224 };
    if (modelPath.includes('299')) return { width: 299, height: 299 };
    if (modelPath.includes('512')) return { width: 512, height: 512 };
    
    // Common defaults
    return { width: 224, height: 224 };
  };

  const inputType = getModelInputType();

  return (
    <div className="glass-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>
          🎮 Model Interface
        </h2>
        <p style={{ color: '#6b7280' }}>
          Provide input for <strong>{model.type.toUpperCase()}</strong> model
        </p>
        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          color: '#4b5563'
        }}>
          {model.path}
        </div>
      </div>

      {/* Dynamic Input Components */}
      <div style={{ marginBottom: '2rem' }}>
        {inputType === 'image' && (
          <ImageUploader
            onImageLoad={handleImageLoad}
            expectedSize={getExpectedImageSize()}
            modelType={model.type.toUpperCase()}
          />
        )}
        
        {inputType === 'text' && (
          <TextInput
            onTextChange={handleTextChange}
            modelType={model.type.toUpperCase()}
            expectedFormat="sentence"
            placeholder="Enter text for the model to process..."
          />
        )}
      </div>

      {/* Input Status */}
      <div style={{ marginBottom: '2rem' }}>
        {inputs.isReady ? (
          <div style={{
            padding: '1rem',
            background: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '0.75rem',
            color: '#166534'
          }}>
            <div className="flex" style={{ alignItems: 'center', marginBottom: '0.5rem' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Inputs Ready!</span>
            </div>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              {Object.keys(inputs.images || {}).length > 0 && `✓ Image loaded (${Object.keys(inputs.images || {}).length})`}
              {Object.keys(inputs.texts || {}).length > 0 && `✓ Text provided (${inputs.texts?.main?.text?.length || 0} chars)`}
            </p>
          </div>
        ) : (
          <div style={{
            padding: '1rem',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.75rem',
            color: '#92400e'
          }}>
            <div className="flex" style={{ alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="font-semibold">Waiting for inputs...</span>
            </div>
          </div>
        )}
      </div>

      {/* Run Inference Button */}
      <button
        onClick={handleRunInference}
        disabled={!inputs.isReady || isRunning}
        className="gradient-button w-full"
        style={{
          opacity: (!inputs.isReady || isRunning) ? 0.6 : 1,
          cursor: (!inputs.isReady || isRunning) ? 'not-allowed' : 'pointer',
          fontSize: '1.1rem',
          padding: '1rem 2rem'
        }}
      >
        {isRunning ? (
          <div className="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div className="loading-spinner" style={{ marginRight: '0.5rem' }}></div>
            Running Inference...
          </div>
        ) : (
          <div className="flex" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run Inference
          </div>
        )}
      </button>
    </div>
  );
}
