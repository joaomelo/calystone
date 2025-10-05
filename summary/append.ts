import fs from "node:fs";
import path from "node:path";

const changelogPath = path.resolve("docs/CHANGELOG.md");
const summaryPath = path.resolve("reports/summary.md");

if (!fs.existsSync(changelogPath) || !fs.existsSync(summaryPath)) {
  process.exit(0);
}

const md = fs.readFileSync(summaryPath, "utf8").trim();
if (!md) {
  process.exit(0);
}

fs.appendFileSync(changelogPath, `\n${md}\n`);
