import Head from "next/head";
import GitUrlForm from "../components/GitUrlForm";
import SampleModelsCard from "../components/SampleModelsCard";
import FallbackStyles from "../components/FallbackStyles";

export default function Home() {
  return (
    <>
      <FallbackStyles />
      <div className="min-h-screen gradient-bg">
        <Head>
          <title>ML Runner: Run ML Models from GitHub</title>
          <meta name="description" content="Run machine learning models directly from GitHub repositories in your browser" />
        </Head>
      
        {/* Main content */}
        <div className="main-container">
          {/* Header */}
          <header className="text-center" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
            <h1 className="hero-title">
              Run ML Models from GitHub
            </h1>
            <p className="hero-subtitle">
              Execute machine learning models directly from GitHub repositories in your browser. 
              No setup required - just paste and run.
            </p>
          </header>

          {/* Main container */}
          <main style={{ paddingBottom: '4rem' }}>
            {/* Sample models card */}
            <div className="mb-8">
              <SampleModelsCard />
            </div>

            {/* Instructions card */}
            <div className="glass-card mb-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>Get Started</h2>
                <p className="text-lg mb-4" style={{ color: '#374151' }}>
                  Paste a public GitHub repository URL containing a supported model file
                </p>
                
                {/* Supported formats */}
                <div style={{ 
                  background: 'linear-gradient(to right, #eff6ff, #eef2ff)', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem', 
                  marginBottom: '1rem' 
                }}>
                  <h3 className="font-semibold mb-4" style={{ color: '#1f2937' }}>Supported Formats</h3>
                  <div className="flex" style={{ 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    gap: '0.75rem' 
                  }}>
                    <span className="format-badge" style={{ 
                      background: '#dcfce7', 
                      color: '#166534',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      .onnx (ONNX)
                    </span>
                    <span className="format-badge" style={{ 
                      background: '#dbeafe', 
                      color: '#1d4ed8',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      model.json (TensorFlow.js)
                    </span>
                    <span className="format-badge" style={{ 
                      background: '#e9d5ff', 
                      color: '#7c3aed',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      config.json (Hugging Face)
                    </span>
                  </div>
                </div>

                {/* Conversion notice */}
                <div style={{ 
                  background: '#fffbeb', 
                  border: '1px solid #fed7aa', 
                  borderRadius: '0.5rem', 
                  padding: '1rem' 
                }}>
                  <p className="text-sm" style={{ color: '#92400e' }}>
                    <strong>Note:</strong> Keras <code style={{ 
                      background: '#fef3c7', 
                      padding: '0.125rem 0.25rem', 
                      borderRadius: '0.25rem' 
                    }}>.h5</code> files are not supported in-browser. 
                    Consider converting to{" "}
                    <a 
                      href="https://onnx.ai/keras2onnx/" 
                      style={{ 
                        fontWeight: '500', 
                        color: '#b45309', 
                        textDecoration: 'underline' 
                      }}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      ONNX
                    </a>
                    {" "}or{" "}
                    <a 
                      href="https://www.tensorflow.org/js/tutorials/conversion/import_keras" 
                      style={{ 
                        fontWeight: '500', 
                        color: '#b45309', 
                        textDecoration: 'underline' 
                      }}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      TensorFlow.js
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Input form */}
            <div className="glass-card">
              <GitUrlForm />
            </div>
          </main>

          {/* Footer */}
          <footer className="text-center" style={{ 
            padding: '2rem', 
            color: 'rgba(255, 255, 255, 0.7)' 
          }}>
            <p className="text-sm">
              Built with Next.js, TensorFlow.js, and ONNX Runtime Web
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}