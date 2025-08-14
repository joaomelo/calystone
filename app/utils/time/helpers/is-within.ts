import type { DateRange } from "./range";

export function isWithinDay(range: DateRange) {
  if (!isWithinMonth(range)) return false;
  return range.start.getDate() === range.due.getDate();
}

export function isWithinHours(range: DateRange) {
  if (!isWithinDay(range)) return false;
  return range.start.getHours() === range.due.getHours();
}

export function isWithinMinutes(range: DateRange) {
  if (!isWithinHours(range)) return false;
  return range.start.getMinutes() === range.due.getMinutes();
}

export function isWithinMonth(range: DateRange) {
  if (!isWithinYear(range)) return false;
  return range.start.getMonth() === range.due.getMonth();
}

export function isWithinYear(range: DateRange) {
  return range.start.getFullYear() === range.due.getFullYear();
}
