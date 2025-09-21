export function isAllDay(start: Date, end: Date) {
  return isBeginningOfDay(start) && isEndOfDay(end);
}

export function isBeginningOfDay(date: Date) {
  return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0;
}

export function isEndOfDay(date: Date) {
  return date.getHours() === 23 && date.getMinutes() === 59 && date.getSeconds() === 59 && date.getMilliseconds() === 999;
}
