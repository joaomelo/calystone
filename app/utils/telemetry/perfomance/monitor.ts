import { Subject } from "rxjs";

import type { PerformanceIssue } from "./issue";

import { performanceIssueTypes } from "./issue";
import { PerformanceObserverMetric } from "./observer-metric";

export class PerformanceIssuesMonitor {
  private subject = new Subject<PerformanceIssue>();

  constructor() {
    performanceIssueTypes.forEach(type => {
      const performanceObserverMetric = new PerformanceObserverMetric(type);
      performanceObserverMetric.subscribe((details) => {
        this.subject.next({
          details,
          type
        });
      });
    });
  }

  subscribe(observer: (issue: PerformanceIssue) => void) {
    const subscription = this.subject.subscribe(observer);
    return () => { subscription.unsubscribe(); };
  }
}
