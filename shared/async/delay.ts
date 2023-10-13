export function delay(seconds?: number) {
  if (!seconds || seconds <= 0) return Promise.resolve();

  const milliseconds = seconds * 1000;
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), milliseconds)
  );
}
