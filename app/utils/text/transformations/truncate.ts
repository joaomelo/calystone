interface Options {
  length: number;
  ellipsis: string;
}

export function truncate(text: string, options?: Options) {
  const { ellipsis = "...", length = 10 } = options ?? {};

  if (text.length <= length) return text;

  const trimmed = text.trim();
  if (trimmed.length <= length) return trimmed;

  return trimmed.slice(0, length).trimEnd() + ellipsis;
}
