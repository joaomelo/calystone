export function formatDate(date: Date) {
  const year = formatYear(date);
  const month = formatMonth(date);
  const day = formatDay(date);
  return `${year}-${month}-${day}`;
}

export function formatDateTime(date: Date) {
  const datePart = formatDate(date);
  const timePart = formatTime(date);
  return `${datePart} ${timePart}`;
}

export function formatDay(date: Date) {
  return String(date.getDate()).padStart(2, "0");
}

export function formatMonth(date: Date) {
  return String(date.getMonth() + 1).padStart(2, "0");
}

export function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatYear(date: Date) {
  return date.getFullYear().toString();
}