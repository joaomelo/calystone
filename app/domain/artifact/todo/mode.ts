export type Mode = (typeof modes)[number];

export const defaultMode: Mode = "pending";
export const modes = ["done", "pending"] as const;

export function isMode(value: unknown): value is Mode {
  if (typeof value !== "string") return false;
  return modes.includes(value as Mode);
}
