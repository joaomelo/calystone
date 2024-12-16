export const activities = {
  open: "open",
  outline: "outline",
  preferences: "preferences",
  reload: "reload",
  search: "search",
  tags: "tags",
} as const;

export const defaultActivity = activities.outline;

export type Activity = typeof activities[keyof typeof activities];

export function isActivity(maybeActivity: unknown): maybeActivity is Activity {
  if (typeof maybeActivity !== "string") return false;
  return Object.values(activities).includes(maybeActivity as Activity);
}