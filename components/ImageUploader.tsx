import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageLoad: (imageData: ImageData, file: File) => void;
  expectedSize?: { width: number; height: number };
  modelType: string;
}

export default function ImageUploader({ onImageLoad, expectedSize, modelType }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not supported');
      }

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      // Set canvas size based on expected model input or original image
      const targetWidth = expectedSize?.width || 224;
      const targetHeight = expectedSize?.height || 224;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw and resize image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      
      // Create preview
      const previewUrl = canvas.toDataURL('image/jpeg', 0.8);
      setPreview(previewUrl);

      onImageLoad(imageData, file);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  }, [onImageLoad, expectedSize]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processImage(file);
    }
  }, [processImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.bmp']
    },
    multiple: false
  });

  return (
    <div className="glass-card">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#1f2937' }}>
          📸 Upload Image
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {modelType} • Expected size: {expectedSize?.width || 224}×{expectedSize?.height || 224}
        </p>
      </div>

      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? '#3b82f6' : '#d1d5db'}`,
          borderRadius: '0.75rem',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: isDragActive ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div>
            <div className="loading-spinner" style={{ margin: '0 auto 1rem auto' }}></div>
            <p style={{ color: '#6b7280' }}>Processing image...</p>
          </div>
        ) : preview ? (
          <div>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '200px', 
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }} 
            />
            <p style={{ color: '#059669', fontSize: '0.875rem' }}>
              ✅ Image loaded and resized
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Click or drag to upload a different image
            </p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <p style={{ color: '#374151', marginBottom: '0.5rem' }}>
              {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              or click to select from your device
            </p>
            <div style={{ 
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: '#9ca3af'
            }}>
              Supports: PNG, JPG, JPEG, WebP, BMP
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          color: '#dc2626',
          fontSize: '0.875rem'
        }}>
          <div className="flex" style={{ alignItems: 'center' }}>
            <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
