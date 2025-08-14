import type { DateRange } from "./range";

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

export function formatDateRange(range: DateRange) {
  const start = formatDateTime(range.start);

  if (isWithinMinutes(range)) {
    return start;
  }

  const dueTime = formatTime(range.due);
  if (isWithinDay(range)) {
    return join(start, dueTime);
  }

  const dueDay = formatDay(range.due);
  if (isWithinMonth(range)) {
    const due = `${dueDay} ${dueTime}`;
    return join(start, due);
  }

  const dueMonth = formatMonth(range.due);
  if (isWithinYear(range)) {
    const due = `${dueMonth}-${dueDay} ${dueTime}`;
    return join(start, due);
  }

  const due = formatDateTime(range.due);
  return join(start, due);
}

function join(start: string, due: string) {
  return `${start} → ${due}`;
}