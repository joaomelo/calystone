export function delay(seconds) {
  if (!seconds) return Promise.resolve(true);

  const milliseconds = seconds * 1000;
  return new Promise((resolve) =>
    setTimeout(() => resolve(true), milliseconds)
  );
}
