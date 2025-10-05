import fs from "node:fs";

export function readJSON<T>(path: string, is: (obj: unknown) => obj is T): null | T {
  try {
    const content = fs.readFileSync(path, "utf8");
    const data = JSON.parse(content);
    return is(data) ? data : null;
  } catch {
    return null;
  }
}