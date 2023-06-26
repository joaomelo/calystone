export function asCss(value) {
  return value.startsWith("--") ? `var(${value})` : value;
}
