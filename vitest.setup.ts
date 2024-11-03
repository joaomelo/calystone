globalThis.requestIdleCallback = (callback: IdleRequestCallback) => {
  const start = Date.now();
  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1);
};

globalThis.cancelIdleCallback = (id: number) => {
  clearTimeout(id);
};