import axios from "axios";

export async function getDefaultBranch(owner: string, repo: string, token?: string): Promise<string> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const res = await axios.get(url, { headers });
  return res.data.default_branch;
}

export interface RepoTreeItem {
  path: string;
  type: string;
  url: string;
}

export async function getRepoTree(owner: string, repo: string, branch: string, token?: string): Promise<RepoTreeItem[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const headers = token ? { Authorization: `token ${token}` } : {};
  const res = await axios.get(url, { headers });
  return res.data.tree;
}
