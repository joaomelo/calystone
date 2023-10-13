export function messageFrom(error: unknown) {
  return typeof error === "string"
    ? error
    : error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ? error.message
    : "unknown error";
}
