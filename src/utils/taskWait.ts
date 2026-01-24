export function task(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}