export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function typeableDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year.toString()}-${month}-${day}`;
}

export function typeableDateTime(date: Date) {
  const datePart = typeableDate(date);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${datePart} ${hours}:${minutes}`;
}

const today = {
  end: endOfDay(new Date()),
  start: startOfDay(new Date()),
} as const;

const tomorrow = {
  end: addDays(today.end, 1),
  start: addDays(today.start, 1),
} as const;

const yesterday = {
  end: addDays(today.end, -1),
  start: addDays(today.start, - 1),
} as const;

function dayOfMonth(day: number) {
  const dayOfMonthBase = new Date(today.start.getFullYear(), today.start.getMonth(), day);
  const dayOfMonth = {
    end: endOfDay(dayOfMonthBase),
    start: startOfDay(dayOfMonthBase),
  } as const;
  return dayOfMonth;
}

export const typicalDates = {
  dayOfMonth,
  today,
  tomorrow,
  yesterday,
} as const;
