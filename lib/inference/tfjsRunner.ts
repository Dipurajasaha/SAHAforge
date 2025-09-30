import * as tf from '@tensorflow/tfjs';

export async function runTfjs(model: tf.GraphModel, inputs: tf.Tensor | tf.Tensor[] | tf.NamedTensorMap): Promise<tf.Tensor | tf.Tensor[] | tf.NamedTensorMap> {
  try {
    const output = model.predict(inputs);
    if (output instanceof Promise) {
      return await output;
    }
    return output;
  } catch (err) {
    throw new Error('TF.js inference failed: ' + (err as Error).message);
  }
}
