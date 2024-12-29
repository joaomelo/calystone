export function isObjectLike(maybeObject: unknown): maybeObject is object {
  return typeof maybeObject === "object" && maybeObject !== null;
}