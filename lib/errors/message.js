export function messageFrom(error) {
  if (typeof error === "string") return error;
  return error?.message || error?.code || "unknown error";
}
