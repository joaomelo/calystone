import { isObjectLike } from "@/utils/objects";

export interface DateRange {
  due: Date;
  start: Date;
}

export function isDateRange(value: unknown): value is DateRange {
  if (!isObjectLike(value)) return false;
  if (!("start" in value)) return false;
  if (!("due" in value)) return false;

  const {
    due, start
  } = value;
  if (!(start instanceof Date)) return false;
  if (!(due instanceof Date)) return false;

  if (start > due) return false;

  return true;
}
