import type { RepoTreeItem } from "./github";


export type ModelType = "onnx" | "tfjs" | "huggingface";

export interface ModelDescriptor {
  type: ModelType;
  path: string;
  inputSpec?: unknown;
  labels?: string[];
  configFile?: string;
}

export function detectModels(tree: RepoTreeItem[]): ModelDescriptor[] {
  const models: ModelDescriptor[] = [];
  for (const item of tree) {
    if (item.type !== "blob") continue;
    if (item.path.endsWith(".onnx")) {
      models.push({ type: "onnx", path: item.path });
    } else if (item.path.endsWith("model.json")) {
      models.push({ type: "tfjs", path: item.path });
    } else if (item.path.match(/config\.(json|yaml|yml)$/i)) {
      // Heuristic: Hugging Face config file
      models.push({ type: "huggingface", path: item.path, configFile: item.path });
    }
  }
  return models;
}
