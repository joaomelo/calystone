import fs from "node:fs";
import path from "node:path";

const changelogPath = path.resolve("docs/CHANGELOG.md");
const summaryPath = path.resolve("reports/summary.md");

if (!fs.existsSync(changelogPath)) {
  console.warn("changelog file not found.");
  process.exit(0);
}

if (!fs.existsSync(summaryPath)) {
  console.warn("summary file not found.");
  process.exit(0);
}

const md = fs.readFileSync(summaryPath, "utf8").trim();
if (!md) {
  console.warn("summary file is empty.");
  process.exit(0);
}

fs.appendFileSync(changelogPath, `\n${md}\n`);
