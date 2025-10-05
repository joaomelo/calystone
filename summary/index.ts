import fs from "node:fs";
import path from "node:path";

import { readJSON } from "./read";
import {
  isVitest,
  vitestAsString,
  vitestFile
} from "./vitest";

const folder = "reports";
const lines: string[] = [];

const vitest = readJSON(path.resolve(folder, vitestFile), isVitest);
if (vitest) {
  lines.push(vitestAsString(vitest));
}

if (!lines.length) {
  process.stdout.write("- No reports found to summarize.");
  process.exit(1);
}

const md = `### Quality Snapshot\n${lines.map(l => l).join("\n")}\n`;

process.stdout.write(md);

const outputPath = path.resolve(folder, "summary.md");
fs.writeFileSync(outputPath, md);