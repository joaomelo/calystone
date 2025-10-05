import fs from "node:fs";
import path from "node:path";

const changelogPath = path.resolve("docs/CHANGELOG.md");
const summaryPath = path.resolve("reports/summary.md");

if (!fs.existsSync(changelogPath)) {
  console.warn("changelog file not found.");
  process.exit(0);
}

const changelog = fs.readFileSync(changelogPath, "utf8");
if (!changelog) {
  console.warn("summary file is empty.");
  process.exit(0);
}

if (!fs.existsSync(summaryPath)) {
  console.warn("summary file not found.");
  process.exit(0);
}

const summary = fs.readFileSync(summaryPath, "utf8").trim();
if (!summary) {
  console.warn("summary file is empty.");
  process.exit(0);
}

const withLead = "\n" + changelog;
const match = /(^|\n)## \[[^\]]+\][^\n]*\n/.exec(withLead);

if (!match) {
  console.warn("no release section found.");
  process.exit(0);
}

const insertPosInWithLead = match.index + match[0].length;
const insertPos = insertPosInWithLead - 1;

const updated
  = changelog.slice(0, insertPos)
  + "\n"
  + summary
  + "\n"
  + changelog.slice(insertPos);

fs.writeFileSync(changelogPath, updated, "utf8");
