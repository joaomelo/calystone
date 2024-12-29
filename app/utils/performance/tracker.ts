export type PerformanceSummary = Record<string, { avg: number; count: number; total: number }>;
type PerformanceData = Record<string, number[]>;

export let performanceTracker: PerformanceData = {};

export function recordPerformance(label: string) {
  const start = performance.now();
  if (!(label in performanceTracker)) {
    performanceTracker[label] = [];
  }

  return () => {
    const end = performance.now();
    if (!(label in performanceTracker)) {
      throw new Error(`performance label "${label}" not found.`);
    }
    performanceTracker[label].push(end - start);
  };
}

export function getPerformanceSummary(): PerformanceSummary {
  const summary: PerformanceSummary = {};
  Object
    .entries(performanceTracker)
    .forEach(([label, stamps]) => {
      const total = stamps.reduce((acc, time) => acc + time, 0);
      summary[label] = {
        avg: parseFloat(((total / stamps.length) / 1000).toFixed(2)),
        count: stamps.length,
        total: parseFloat((total / 1000).toFixed(2))
      };
    });
  return summary;
}

export function resetPerformanceData() {
  performanceTracker = {};
}