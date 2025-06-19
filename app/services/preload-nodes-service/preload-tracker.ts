import type { Nodes } from "@/domain";

import { LoggerContainer, Tracker } from "@/utils";

export class PreloadTracker {
  private readonly benchmark = 1_000;
  private lastBenchmark = 0;
  private readonly nodes: Nodes;
  private stopwatch: () => void;
  private tracker: Tracker = new Tracker(`preload-${this.benchmark.toString()}`);

  constructor(nodes: Nodes) {
    this.nodes = nodes;
    this.lastBenchmark = nodes.size();
    this.stopwatch = this.tracker.record();
  }

  mark() {
    const progress = this.nodes.size() - this.lastBenchmark;
    if (progress >= this.benchmark) {
      this.stopwatch();
      this.lastBenchmark = this.nodes.size();
      this.stopwatch = this.tracker.record();

      const logger = LoggerContainer.use();
      const summary = this.tracker.summary();
      logger.debug(summary);
    }
  }
}