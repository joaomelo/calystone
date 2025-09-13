import { Subject } from "rxjs";

import type { PerformanceIssue } from "./issue";

import { PerformanceObserverMetric } from "./observer-metric";

export class PerformanceIssuesMonitor {
  private longAnimationFrameCount = 0;
  private longTaskCount = 0;
  private subject = new Subject<PerformanceIssue>();

  constructor() {
    const longAnimationFrameObserver = new PerformanceObserverMetric("long-animation-frame");
    longAnimationFrameObserver.subscribe((details) => {
      this.longAnimationFrameCount += 1;
      this.subject.next({
        count: this.longAnimationFrameCount,
        details,
        type: "long-animation-frame",
      });
    });

    const longTaskObserver = new PerformanceObserverMetric("longtask");
    longTaskObserver.subscribe((details) => {
      this.longTaskCount += 1;
      this.subject.next({
        count: this.longTaskCount,
        details,
        type: "longtask",
      });
    });
  }

  subscribe(observer: (issue: PerformanceIssue) => void) {
    const subscription = this.subject.subscribe(observer);
    return () => { subscription.unsubscribe(); };
  }
}
