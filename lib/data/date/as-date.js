import { isDate } from "./is-date";

export function asDate(maybeDate) {
  if (!maybeDate) return null;
  const date = new Date(maybeDate);
  if (isDate(date)) return date;

  return null;
}
