export async function csvToNumericArray(file: File): Promise<number[][]> {
  const text = await file.text();
  return text.trim().split(/\r?\n/).map(row => row.split(',').map(Number));
}
