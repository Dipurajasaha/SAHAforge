import Head from "next/head";
import GitUrlForm from "../components/GitUrlForm";
import SampleModelsCard from "../components/SampleModelsCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>ML Runner: Run ML Models from GitHub</title>
      </Head>
      <main className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Run ML Models from GitHub</h1>
        <SampleModelsCard />
        <div className="mb-6 text-gray-700 text-center">
          <p>Paste a public GitHub repo URL containing a supported model file.</p>
          <p className="mt-2 text-sm text-gray-500">Supported formats: <span className="font-mono">.onnx</span> (ONNX), <span className="font-mono">model.json</span> (TF.js), Hugging Face <span className="font-mono">config.json</span></p>
          <p className="mt-2 text-xs text-gray-400">Keras <span className="font-mono">.h5</span> files are not supported in-browser. <a href="https://onnx.ai/keras2onnx/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Convert to ONNX</a> or <a href="https://www.tensorflow.org/js/tutorials/conversion/import_keras" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">TF.js</a>.</p>
        </div>
        <GitUrlForm />
      </main>
    </div>
  );
}
