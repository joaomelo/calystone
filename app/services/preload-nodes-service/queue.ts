import type { Node } from "@/domain";

export class Queue {
  private queue: Node[] = [];

  add(nodes: Node[]): void {
    this.queue.push(...nodes);
  }

  clear(): void {
    this.queue.length = 0;
  }

  empty(): boolean {
    return this.queue.length === 0;
  }

  next(): Node | undefined {
    return this.queue.shift();
  }

  size(): number {
    return this.queue.length;
  }
}
