import type { FileText } from "./file-text";

export async function fetchText(file: FileText): Promise<string> {
  const buffer = await file.fetch();
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}