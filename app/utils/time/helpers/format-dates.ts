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
    return formattedStart;
  }

  const endTime = formatTime(end);
  if (isWithinDay(start, end)) {
    return join(formattedStart, endTime);
  }

  const endDay = formatDay(end);
  if (isWithinMonth(start, end)) {
    const end = `${endDay} ${endTime}`;
    return join(formattedStart, end);
  }

  const endMonth = formatMonth(end);
  if (isWithinYear(start, end)) {
    const end = `${endMonth}-${endDay} ${endTime}`;
    return join(formattedStart, end);
  }

  const formattedEnd = formatDateTime(end);
  return join(formattedStart, formattedEnd);
}

function join(formattedStart: string, formattedEnd: string) {
  return `${formattedStart} → ${formattedEnd}`;
}