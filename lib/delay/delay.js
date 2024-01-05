export function delay(seconds) {
  if (!seconds || seconds <= 0) return Promise.resolve();

  const milliseconds = seconds * 1000;
  return new Promise(resolve => setTimeout(() => resolve(), milliseconds));
}
