import type { Node } from "@/domain/node";

import { idle } from "@/utils";

export class Scheduler {
  loading = false;
  readonly queue: Node[] = [];
  timeoutId?: number;
  timeoutTime = 200;

  async next(): Promise<void> {
    await idle();
    const node = this.queue.shift();
    if (node && node.status === "unloaded") {
      this.loading = true;
      try {
        await node.load();
      } finally {
        this.loading = false;
      }
    };

    this.timeoutId = window.setTimeout(
      () => {
        void this.next();
      },
      this.timeoutTime
    );
  }

  schedule(node: Node, priority = false): void {
    if (priority) {
      this.queue.unshift(node);
    } else {
      this.queue.push(node);
    }
  }

  start(): void {
    void this.next();
  }

  stop(): void {
    clearTimeout(this.timeoutId);
    this.queue.length = 0;
  }
}