import { isDate } from "./is-date";

export function asDate(maybeDate) {
  if (!maybeDate) return null;

  const date
    // string in the format "YYYY-MM-DD" have the ambiguity of us not knowing in which timezone they are defined (UTC or local?) the algorithm below assume they refer to local date time
    = typeof maybeDate === "string" && maybeDate.length === 10
      ? parseDateString(maybeDate)
      : new Date(maybeDate);

  if (isDate(date)) return date;
  return null;
}

function parseDateString(maybeDate) {
  const [y, m, d] = maybeDate.split(/\D/);
  return new Date(y, m - 1, d);
}
