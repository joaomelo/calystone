export const ACTIVITIES = {
  OPEN: "open",
  OUTLINE: "outline",
  PREFERENCES: "preferences",
  SEARCH: "search",
  TAGS: "tags"
} as const;

export const DEFAULT_ACTIVITY = ACTIVITIES.OUTLINE;

export type Activity = typeof ACTIVITIES[keyof typeof ACTIVITIES];

export function isActivity(id: string): id is Activity {
  return Object.values(ACTIVITIES).includes(id as Activity);
}