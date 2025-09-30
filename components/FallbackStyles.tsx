// Fallback component with inline CSS for when Tailwind doesn't load
import React from 'react';

const FallbackStyles = () => (
  <style jsx global>{`
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #db2777 100%);
      min-height: 100vh;
      color: #333;
    }
    
    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      text-align: center;
      background: linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 60px 0 20px 0;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: #bfdbfe;
      text-align: center;
      max-width: 600px;
      margin: 0 auto 60px auto;
      line-height: 1.7;
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      margin: 20px 0;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .gradient-button {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      margin: 20px 0;
    }
    
    .gradient-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
    }
    
    .form-input {
      width: 100%;
      padding: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      margin: 10px 0;
      box-sizing: border-box;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .sample-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    
    .sample-card {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      padding: 24px;
      border-radius: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      display: block;
    }
    
    .sample-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .footer {
      text-align: center;
      padding: 40px 20px;
      color: rgba(255, 255, 255, 0.7);
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      .glass-card {
        padding: 20px;
        margin: 10px;
      }
    }
  `}</style>
);

export default FallbackStyles;