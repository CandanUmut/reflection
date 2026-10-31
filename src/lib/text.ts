/** Shortens plain text for a meta description: ends at the last full
 *  sentence that fits, or else at the last whole word, with an ellipsis. */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.search(/[.!?](?=\s)[^.!?]*$/);
  if (sentence > max * 0.5) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:–—-]$/, '') + '…';
}
