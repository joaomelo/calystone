import type {
  OutputChunk,
  RollupOutput,
  RollupWatcher
} from "rollup";

import path from "node:path";
import { build } from "vite";

const CHUNK_LIST_LIMIT = 3;
const CHUNK_NAME_MAX_LENGTH = 32;
const APP_LABEL = "app";
const INTERNAL_LABEL = "internal";

export async function bundleAsString(): Promise<null | string> {
  let buildResult: RollupOutput | RollupOutput[];

  try {
    const result = await build({
      build: {
        emptyOutDir: false,
        write: false
      },
      configFile: path.resolve("vite.config.ts"),
      logLevel: "silent"
    });
    if (isRollupWatcher(result)) return null;
    buildResult = result;
  } catch (error) {
    console.warn("bundle summary: vite build failed.", error);
    return null;
  }

  const outputs = Array.isArray(buildResult) ? buildResult : [buildResult];
  const chunks: OutputChunk[] = [];

  for (const output of outputs) {
    for (const item of output.output) {
      if (item.type === "chunk") chunks.push(item);
    }
  }

  if (!chunks.length) return "- Bundle: no chunks emitted.";

  const chunkSummaries = chunks.map(chunk => {
    const raw = Buffer.byteLength(chunk.code, "utf8");
    return {
      name: chunk.fileName,
      raw
    };
  }).sort((a, b) => b.raw - a.raw);

  const totalRaw = chunkSummaries.reduce((sum, chunk) => sum + chunk.raw, 0);
  if (!totalRaw) return "- Bundle: no chunk size information found.";

  const chunkSegments = chunkSummaries
    .slice(0, CHUNK_LIST_LIMIT)
    .map(({
      name,
      raw
    }) => `${shorten(name)} ${formatBytes(raw)}`);

  const otherRaw = chunkSummaries
    .slice(CHUNK_LIST_LIMIT)
    .reduce((sum, chunk) => sum + chunk.raw, 0);
  if (otherRaw > 0) chunkSegments.push(`others ${formatBytes(otherRaw)}`);

  const packageTotals = aggregatePackages(chunks);
  const topPackages = [...packageTotals.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, size]) => `${name} ${formatPercent(totalRaw ? size / totalRaw : 0)}`);

  const chunkCount = chunkSummaries.length;
  const chunkSummary = chunkSegments.length ? ` (${chunkSegments.join(", ")})` : "";

  const parts = [
    `- Bundle: ${formatBytes(totalRaw)} raw across ${chunkCount.toFixed(0)} chunk${chunkCount === 1 ? "" : "s"}${chunkSummary}.`,
    topPackages.length ? `Top sources: ${topPackages.join(", ")}.` : undefined
  ].filter(Boolean);

  return parts.join(" ");
}

function isRollupWatcher( obj: unknown): obj is RollupWatcher {
  return (
    obj !== null
    && typeof obj === "object"
    && "on" in obj
    && typeof (obj as { on: unknown }).on === "function"
  );
}

function aggregatePackages(chunks: OutputChunk[]): Map<string, number> {
  const totals = new Map<string, number>();

  for (const chunk of chunks) {
    for (const [moduleId, info] of Object.entries(chunk.modules)) {
      const size = extractModuleSize(info);
      const name = packageNameFromId(moduleId);
      totals.set(name, (totals.get(name) ?? 0) + size);
    }
  }

  return totals;
}

function extractModuleSize(info: unknown): number {
  if (!info || typeof info !== "object") return 0;
  const rendered = (info as { renderedLength?: unknown }).renderedLength;
  if (typeof rendered === "number" && Number.isFinite(rendered)) return rendered;
  const original = (info as { originalLength?: unknown }).originalLength;
  if (typeof original === "number" && Number.isFinite(original)) return original;
  return 0;
}

function packageNameFromId(id: string): string {
  const normalized = id.replace(/^\u0000/, "");
  const nodeModulesIdx = normalized.lastIndexOf("node_modules/");
  if (nodeModulesIdx === -1) {
    if (!normalized) return INTERNAL_LABEL;
    return normalized.includes("vite") ? "vite" : APP_LABEL;
  }

  const pathAfter = normalized.slice(nodeModulesIdx + "node_modules/".length);
  const segments = pathAfter.split(/[\\/]/).filter(Boolean);
  if (!segments.length) return INTERNAL_LABEL;
  if (segments[0].startsWith("@") && segments.length > 1) return `${segments[0]}/${segments[1]}`;
  return segments[0];
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formatted = value >= 100 ? value.toFixed(0) : value >= 10 ? value.toFixed(1) : value.toFixed(2);
  return `${formatted} ${units[unitIndex]}`;
}

function formatPercent(ratio: number): string {
  if (!ratio || !Number.isFinite(ratio)) return "0%";
  const percentage = ratio * 100;
  return percentage >= 10 ? `${percentage.toFixed(0)}%` : `${percentage.toFixed(1)}%`;
}

function shorten(name: string, maxLength = CHUNK_NAME_MAX_LENGTH): string {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength - 3)}...`;
}
