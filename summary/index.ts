import fs from "node:fs";
import path from "node:path";

function maybeLine(line: null | string) {
  return line ? `- ${line}\n` : "";
}

function pct(n: number | undefined) {
  return typeof n === "number" ? `${(Math.round(n * 100) / 100).toFixed(2)}%` : "n/a";
}

function readJSON<T = any>(p: string): null | T {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

const lines: string[] = [];
const today = new Date().toISOString().slice(0, 10);

const vitest = readJSON<{
  numFailedTests: number;
  numPassedTests: number;
  numTotalTests: number;
  numTotalTestSuites: number;
}>(path.resolve("reports/vitest-results.json"));
if (vitest) {
  lines.push(`- **Tests (Vitest):** ${vitest.numPassedTests}/${vitest.numTotalTests} passed, ${vitest.numFailedTests} failed, ${vitest.numTotalTestSuites} suites`);
}

// Fallback if empty
if (!lines.length) {
  lines.push("- No reports found to summarize.");
}

const md = `### Quality Snapshot — ${today}\n${lines.map(l => l).join("\n")}\n`;
process.stdout.write(md);
