import { idle } from "@/utils/idle";

export type Task = (() => Promise<void>) | (() => void);

export class Scheduler {
  active = false;
  loading = false;
  readonly queue: Task[] = [];
  timeoutId?: number;
  timeoutTime;

  constructor(timeoutTime = 200) {
    this.timeoutTime = timeoutTime;
  }

  async next(): Promise<void> {
    await idle();

    try {
      this.loading = true;
      const task = this.queue.shift();
      if (task) await task();
    } finally {
      this.loading = false;

      if (this.active) {
        this.timeoutId = window.setTimeout(
          () => {
            void this.next();
          },
          this.timeoutTime
        );
      }
    }
  }

  schedule(task: Task, priority?: boolean): void {
    if (priority) {
      this.queue.unshift(task);
    } else {
      this.queue.push(task);
    }
  }

  start(): void {
    this.active = true;
    void this.next();
  }

  stop(): void {
    this.active = false;
    clearTimeout(this.timeoutId);
    this.queue.length = 0;
  }
}