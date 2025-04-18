import { isObjectLike } from "@/utils";

export type Mode = (typeof modes)[number];

export const defaultMode: Mode = "pending";
export const modes = ["done", "pending"] as const;

export function hasMode(value: unknown): value is { mode: Mode } {
  if (!isObjectLike(value)) return false;
  if (!("mode" in value)) return false;
  return isMode(value.mode);
}

export function isMode(value: unknown): value is Mode {
  if (typeof value !== "string") return false;
  return modes.includes(value as Mode);
}
