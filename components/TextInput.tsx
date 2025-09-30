import React, { useState } from 'react';

interface TextInputProps {
  onTextChange: (text: string, tokens?: number[]) => void;
  placeholder?: string;
  modelType: string;
  maxLength?: number;
  expectedFormat?: 'sentence' | 'paragraph' | 'keywords' | 'any';
}

export default function TextInput({ 
  onTextChange, 
  placeholder = "Enter your text here...", 
  modelType,
  maxLength = 512,
  expectedFormat = 'any'
}: TextInputProps) {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextChange = async (value: string) => {
    setText(value);
    setIsProcessing(true);
    
    try {
      // Simple tokenization (for demo - in real app would use proper tokenizer)
      const tokens = value.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map((word, index) => index); // Simplified token mapping
      
      onTextChange(value, tokens);
    } finally {
      setIsProcessing(false);
    }
  };

  const getFormatDescription = () => {
    switch (expectedFormat) {
      case 'sentence': return 'Single sentence or short phrase';
      case 'paragraph': return 'Multiple sentences or paragraph';
      case 'keywords': return 'Comma-separated keywords';
      default: return 'Any text format';
    }
  };

  const getSampleText = () => {
    switch (expectedFormat) {
      case 'sentence': return 'This is a sample sentence for testing.';
      case 'paragraph': return 'This is a sample paragraph with multiple sentences. It contains various words and phrases that can be used for testing the model.';
      case 'keywords': return 'machine learning, artificial intelligence, neural networks';
      default: return 'Enter your text here...';
    }
  };

  return (
    <div className="glass-card">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#1f2937' }}>
          📝 Text Input
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {modelType} • {getFormatDescription()}
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={6}
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            color: '#374151',
            backgroundColor: 'white',
            resize: 'vertical',
            minHeight: '120px',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        
        {isProcessing && (
          <div style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0.5rem',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            <div className="loading-spinner" style={{ 
              width: '12px', 
              height: '12px', 
              display: 'inline-block',
              marginRight: '0.25rem' 
            }}></div>
            Processing...
          </div>
        )}
      </div>

      <div className="flex" style={{ 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '0.75rem',
        fontSize: '0.75rem',
        color: '#9ca3af'
      }}>
        <span>{text.length} / {maxLength} characters</span>
        <span>{text.split(/\s+/).filter(word => word.length > 0).length} words</span>
      </div>

      {expectedFormat !== 'any' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}>
          <div className="flex" style={{ alignItems: 'flex-start' }}>
            <div style={{ marginRight: '0.5rem', color: '#0369a1' }}>💡</div>
            <div>
              <strong style={{ color: '#0369a1' }}>Example format:</strong>
              <div style={{ 
                marginTop: '0.25rem',
                padding: '0.5rem',
                background: 'white',
                borderRadius: '0.25rem',
                fontStyle: 'italic',
                color: '#374151'
              }}>
                "{getSampleText()}"
              </div>
            </div>
          </div>
        </div>
      )}

      {text.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#f0fdf4',
          border: '1px solid #22c55e',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: '#166534'
        }}>
          ✅ Text ready for processing
        </div>
      )}
    </div>
  );
}
