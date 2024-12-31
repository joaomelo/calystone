import type { Node } from "@/domain/node";

import { idle } from "@/utils";

export class Scheduler {
  private readonly queue: Node[] = [];
  private timeoutId?: number;
  private timeoutTime = 200;

  private async next(): Promise<void> {
    await idle();
    const node = this.queue.shift();
    if (node && node.status === "unloaded") await node.load();
    this.timeoutId = window.setTimeout( () => { void this.next(); }, this.timeoutTime );
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