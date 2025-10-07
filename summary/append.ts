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
  console.warn("changelog file is empty.");
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

const changelogNormalized = changelog
  .replace(/\r\n/g, "\n")
  .replace(/(^# Changelog)\n{2,}/m, "$1\n\n");

const match = /(^|\n)## \[[^\]]+\][^\n]*\n/.exec(changelogNormalized);
if (!match) {
  console.warn("no release section found.");
  process.exit(0);
}

const insertPos = match.index + match[0].length;

const alreadyHas = changelogNormalized
  .slice(insertPos, insertPos + summary.length + 2)
  .startsWith("\n" + summary);
if (alreadyHas) process.exit(0);

const before = changelogNormalized.slice(0, insertPos).replace(/\n+$/, "\n");
const after = changelogNormalized.slice(insertPos).replace(/^\n+/, "");

const updated = `${before}\n${summary}\n\n${after}`;
const updatedNormalized = updated.endsWith("\n") ? updated : updated + "\n";

fs.writeFileSync(changelogPath, updatedNormalized, "utf8");
