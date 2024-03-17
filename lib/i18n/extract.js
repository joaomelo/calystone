export function extract(messages) {
  if (typeof messages !== "object" || messages === null || Array.isArray(messages)) return [];
  return Object.keys(messages);
}
