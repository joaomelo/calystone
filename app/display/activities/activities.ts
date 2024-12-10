export const ACTIVITIES = {
  OPEN: "open",
  OUTLINE: "outline",
  PREFERENCES: "preferences",
  RELOAD: "reload",
  SEARCH: "search",
  TAGS: "tags",
} as const;

export const DEFAULT_ACTIVITY = ACTIVITIES.OUTLINE;

export type Activity = typeof ACTIVITIES[keyof typeof ACTIVITIES];

export function isActivity(maybeActivity: unknown): maybeActivity is Activity {
  if (typeof maybeActivity !== "string") return false;
  return Object.values(ACTIVITIES).includes(maybeActivity as Activity);
}