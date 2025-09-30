import Head from "next/head";
import GitUrlForm from "../components/GitUrlForm";
import SampleModelsCard from "../components/SampleModelsCard";
import FallbackStyles from "../components/FallbackStyles";

export default function Home() {
  return (
    <>
      <FallbackStyles />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <Head>
          <title>ML Runner: Run ML Models from GitHub</title>
          <meta name="description" content="Run machine learning models directly from GitHub repositories in your browser" />
        </Head>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-16 pb-8">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
              Run ML Models from GitHub
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Execute machine learning models directly from GitHub repositories in your browser. 
              No setup required - just paste and run.
            </p>
          </div>
        </header>

        {/* Main container */}
        <main className="max-w-4xl mx-auto px-6 pb-16">
          {/* Sample models card */}
          <div className="mb-8">
            <SampleModelsCard />
          </div>

          {/* Instructions card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started</h2>
              <p className="text-lg text-gray-700 mb-4">
                Paste a public GitHub repository URL containing a supported model file
              </p>
              
              {/* Supported formats */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">Supported Formats</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    .onnx (ONNX)
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    model.json (TensorFlow.js)
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    config.json (Hugging Face)
                  </span>
                </div>
              </div>

              {/* Conversion notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Keras <code className="bg-amber-100 px-1 rounded">.h5</code> files are not supported in-browser. 
                  Consider converting to{" "}
                  <a 
                    href="https://onnx.ai/keras2onnx/" 
                    className="font-medium text-amber-700 hover:text-amber-900 underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    ONNX
                  </a>
                  {" "}or{" "}
                  <a 
                    href="https://www.tensorflow.org/js/tutorials/conversion/import_keras" 
                    className="font-medium text-amber-700 hover:text-amber-900 underline"
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
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <GitUrlForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-white/70">
          <p className="text-sm">
            Built with Next.js, TensorFlow.js, and ONNX Runtime Web
          </p>
        </footer>
      </div>
    </div>
    </>
  );
}
