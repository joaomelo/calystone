export interface PerformanceIssue {
  count: number;
  type: PerformanceIssueType;
  details: unknown;
}

export const performanceIssueTypes = ["long-animation-frame", "longtask"] as const;
export type PerformanceIssueType = typeof performanceIssueTypes[number];