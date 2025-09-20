export function isArrayFull(type: unknown): type is readonly unknown[] {
  return Array.isArray(type) && type.length > 0;
}