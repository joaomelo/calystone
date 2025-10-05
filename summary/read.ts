import fs from "node:fs";

export function readJSON(p: string): null | unknown {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}