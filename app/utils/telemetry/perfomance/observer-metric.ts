import { Subject } from "rxjs";

export class PerformanceObserverMetric {
  private readonly observer?: PerformanceObserver;
  private readonly subject = new Subject<unknown>();

  constructor(metric: "long-animation-frame" | "longtask") {
    if (typeof PerformanceObserver === "undefined") return;
    if (!PerformanceObserver.supportedEntryTypes.includes(metric)) return;

    this.observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType !== metric) continue;
        const metrics = entry.toJSON() as unknown;
        this.subject.next(metrics);
      }
    });

    this.observer.observe({ entryTypes: [metric] });
  }

  subscribe(observer: (data: unknown) => void) {
    const subscription = this.subject.subscribe(observer);
    return () => { subscription.unsubscribe(); };
  }
}