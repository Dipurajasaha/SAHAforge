import * as tf from '@tensorflow/tfjs';

export async function loadTfjsModel(url: string): Promise<tf.GraphModel> {
  try {
    const model = await tf.loadGraphModel(url);
    console.log('TF.js model loaded:', model.inputs, model.outputs);
    return model;
  } catch (err) {
    console.error('Failed to load TF.js model:', err);
    throw err;
  }
}

export async function predictTfjsModel(model: tf.GraphModel, inputs: tf.Tensor | tf.Tensor[] | tf.NamedTensorMap): Promise<tf.Tensor | tf.Tensor[] | tf.NamedTensorMap> {
  try {
    const output = model.predict(inputs);
    console.log('TF.js model output:', output);
    return output;
  } catch (err) {
    console.error('TF.js inference error:', err);
    throw err;
  }
}
