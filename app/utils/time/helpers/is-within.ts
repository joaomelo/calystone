export function isWithinDay(start: Date, end: Date) {
  if (!isWithinMonth(start, end)) return false;
  return start.getDate() === end.getDate();
}

export function isWithinHours(start: Date, end: Date) {
  if (!isWithinDay(start, end)) return false;
  return start.getHours() === end.getHours();
}

export function isWithinMinutes(start: Date, end: Date) {
  if (!isWithinHours(start, end)) return false;
  return start.getMinutes() === end.getMinutes();
}

export function isWithinMonth(start: Date, end: Date) {
  if (!isWithinYear(start, end)) return false;
  return start.getMonth() === end.getMonth();
}

export function isWithinYear(start: Date, end: Date) {
  return start.getFullYear() === end.getFullYear();
}
