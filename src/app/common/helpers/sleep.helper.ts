export function sleep(timeoutMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), timeoutMs);
  });
}
