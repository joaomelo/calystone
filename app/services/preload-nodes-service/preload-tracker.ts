import type { Nodes } from "@/domain";

import { getPerformanceSummary, recordPerformance } from "@/utils";

export class PreloadTracker {
  private readonly benchmark = 1_000;
  private readonly label = `preload-${this.benchmark.toString()}`;
  private lastBenchmark = 0;
  private readonly nodes: Nodes;
  private stopwatch: () => void;

  constructor(nodes: Nodes) {
    this.nodes = nodes;
    this.lastBenchmark = nodes.size();
    this.stopwatch = recordPerformance(this.label);
  }

  mark() {
    const progress = this.nodes.size() - this.lastBenchmark;
    if (progress >= this.benchmark) {
      this.stopwatch();
      this.lastBenchmark = this.nodes.size();
      this.stopwatch = recordPerformance(this.label);

      const summary = getPerformanceSummary();
      console.info(`${this.label}: ${summary[this.label].avg.toString()}ms`);
    }
  }
}