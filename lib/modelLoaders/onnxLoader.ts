import * as ort from 'onnxruntime-web';

export async function loadOnnxModel(url: string): Promise<ort.InferenceSession> {
  try {
    const session = await ort.InferenceSession.create(url);
    console.log('ONNX model loaded:', session.inputNames, session.outputNames);
    return session;
  } catch (err) {
    console.error('Failed to load ONNX model:', err);
    throw err;
  }
}

export async function runOnnxModel(session: ort.InferenceSession, inputs: Record<string, ort.Tensor>): Promise<Record<string, ort.Tensor>> {
  try {
    const output = await session.run(inputs);
    console.log('ONNX model output:', output);
    return output;
  } catch (err) {
    console.error('ONNX inference error:', err);
    throw err;
  }
}
