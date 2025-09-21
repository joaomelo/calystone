import {
  formatDateTime,
  formatDay,
  formatMonth,
  formatTime,
} from "./format-date-time";
import {
  isWithinDay,
  isWithinMinutes,
  isWithinMonth,
  isWithinYear
} from "./is-within";

export function formatDates(start: Date, end: Date) {
  const formattedStart = formatDateTime(start);

  if (isWithinMinutes(start, end)) {
    return start;
  }

  const endTime = formatTime(end);
  if (isWithinDay(start, end)) {
    return join(formattedStart, endTime);
  }

  const dueDay = formatDay(end);
  if (isWithinMonth(start, end)) {
    const due = `${dueDay} ${endTime}`;
    return join(formattedStart, due);
  }

  const dueMonth = formatMonth(end);
  if (isWithinYear(start, end)) {
    const due = `${dueMonth}-${dueDay} ${endTime}`;
    return join(formattedStart, due);
  }

  const formattedEnd = formatDateTime(end);
  return join(formattedStart, formattedEnd);
}

function join(formattedStart: string, formattedEnd: string) {
  return `${formattedStart} → ${formattedEnd}`;
}