export interface PerformanceIssue {
  type: PerformanceIssueType;
  details: unknown;
}

export const performanceIssueTypes = ["long-animation-frame", "longtask"] as const;
export type PerformanceIssueType = typeof performanceIssueTypes[number];