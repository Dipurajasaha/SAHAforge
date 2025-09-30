import * as ort from 'onnxruntime-web';

export async function runOnnx(session: ort.InferenceSession, inputs: Record<string, ort.Tensor>): Promise<Record<string, ort.Tensor>> {
  try {
    const output = await session.run(inputs);
    return output;
  } catch (err) {
    throw new Error('ONNX inference failed: ' + (err as Error).message);
  }
}
