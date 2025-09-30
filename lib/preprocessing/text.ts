export function simpleTokenize(text: string): number[] {
  // Simple whitespace tokenizer, returns char codes
  return text.trim().split(/\s+/).map(w => w.split('').map(c => c.charCodeAt(0))).flat();
}
