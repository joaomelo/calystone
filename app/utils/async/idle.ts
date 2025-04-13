export function idle() {
  if (typeof requestIdleCallback !== "undefined") {
    return new Promise(resolve => requestIdleCallback(resolve));
  }
  return new Promise(resolve => setTimeout(resolve, 100));
}