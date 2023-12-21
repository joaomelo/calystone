export function truncate(str, limit) {
  if (typeof str !== "string" || typeof limit !== "number") return str;
  if (str.length <= limit) return str;

  const trimmedStr = str.trim();
  if (trimmedStr.length <= limit) return trimmedStr;

  const filler = "...";
  const c = trimmedStr.substring(0, limit - filler.length);
  return `${c}${filler}`;
}
