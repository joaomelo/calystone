export class Queue<T> {
  private items: T[] = [];

  add(items: T[]): void {
    this.items.push(...items);
  }

  clear(): void {
    this.items.length = 0;
  }

  empty(): boolean {
    return this.items.length === 0;
  }

  next(batch = 1): T[] {
    if (this.empty()) return [];

    const actualBatch = Math.min(batch, this.items.length);
    return this.items.splice(0, actualBatch);
  }

  size(): number {
    return this.items.length;
  }
}
