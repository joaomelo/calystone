import type { Nodes } from "@/domain";

import { LoggerContainer, Tracker } from "@/utils";

export class PreloadTracker {
  private lastBenchmark = 0;
  private readonly nodes: Nodes;
  private stopwatch: (amount: number) => void;
  private tracker: Tracker = new Tracker("preload");

  constructor(nodes: Nodes) {
    this.nodes = nodes;
    this.lastBenchmark = nodes.size();
    this.stopwatch = this.tracker.record();
  }

  mark() {
    const amount = this.nodes.size() - this.lastBenchmark;
    if (amount === 0) return;

    this.stopwatch(amount);
    this.lastBenchmark = this.nodes.size();
    this.stopwatch = this.tracker.record();

    const logger = LoggerContainer.use();
    const summary = this.tracker.summary();
    logger.debug(summary);
  }
}