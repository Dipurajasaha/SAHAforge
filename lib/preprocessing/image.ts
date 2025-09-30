export async function preprocessImage(file: File, targetSize: [number, number] = [224, 224]): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetSize[0];
      canvas.height = targetSize[1];
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No 2D context');
      ctx.drawImage(img, 0, 0, targetSize[0], targetSize[1]);
      const data = ctx.getImageData(0, 0, targetSize[0], targetSize[1]).data;
      // Normalize to [0,1]
      const floatData = new Float32Array(targetSize[0] * targetSize[1] * 3);
      for (let i = 0; i < targetSize[0] * targetSize[1]; i++) {
        floatData[i * 3 + 0] = data[i * 4 + 0] / 255;
        floatData[i * 3 + 1] = data[i * 4 + 1] / 255;
        floatData[i * 3 + 2] = data[i * 4 + 2] / 255;
      }
      resolve(floatData);
    };
    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
