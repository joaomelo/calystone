interface Bundle {
  version: number;
  tree: Tree;
  nodeParts: Record<string, NodePart>;
  nodeMetas: Record<string, NodeMeta>;
}

interface Tree {
  name: string;
  uid?: string;
  children?: Tree[];
  isRoot?: true;
}

interface NodeMeta {
  id: string;
  moduleParts: Record<string, string>;
}

interface NodePart {
  renderedLength: number;
  gzipLength: number;
  metaUid: string;
}

interface SizeTotals {
  rendered: number;
  gzip: number;
}

export const bundleFile = "bundle-results.json";

const APP_LABEL = "app";
const INTERNAL_LABEL = "internal";

export function isBundle(obj: unknown): obj is Bundle {
  return typeof obj === "object"
    && obj !== null
    && "version" in obj
    && typeof (obj).version === "number"
    && "tree" in obj
    && typeof (obj).tree === "object"
    && "nodeParts" in obj
    && typeof (obj).nodeParts === "object"
    && "nodeMetas" in obj
    && typeof (obj).nodeMetas === "object";
}

export function bundleAsString(bundle: Bundle): string {
  const nodePartEntries = Object.entries(bundle.nodeParts);
  if (!nodePartEntries.length) return "- Bundle: no module information found";

  const chunkByPart = mapPartToChunk(bundle.nodeMetas);

  let totalRendered = 0;
  let totalGzip = 0;

  const chunkTotals = new Map<string, SizeTotals>();
  const packageTotals = new Map<string, number>();

  for (const [uid, part] of nodePartEntries) {
    const rendered = isFiniteNumber(part.renderedLength) ? part.renderedLength : 0;
    const gzip = isFiniteNumber(part.gzipLength) ? part.gzipLength : 0;

    totalRendered += rendered;
    totalGzip += gzip;

    const chunkName = chunkByPart.get(uid);
    if (chunkName) accumulateSize(chunkTotals, chunkName, rendered, gzip);

    const meta = bundle.nodeMetas[part.metaUid];
    const moduleId = meta.id;
    const packageName = packageNameFromId(moduleId);
    packageTotals.set(packageName, (packageTotals.get(packageName) ?? 0) + rendered);
  }

  const chunkCount = chunkTotals.size || (bundle.tree.children?.length ?? 0);

  const sizeParts = [`${formatBytes(totalRendered)} raw`];
  if (totalGzip > 0) sizeParts.push(`${formatBytes(totalGzip)} gzip`);

  const largestChunk = [...chunkTotals.entries()]
    .sort(([, a], [, b]) => b.rendered - a.rendered)[0];

  const topPackages = [...packageTotals.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, size]) => `${typeof name === "string" ? name : "unknown"} ${formatPercent(totalRendered ? size / totalRendered : 0)}`);

  const segments = [
    `- Bundle: ${chunkCount.toFixed(0)} chunk${chunkCount === 1 ? "" : "s"} · ${sizeParts.join(", ")}.`,
    `Largest chunk ${shorten(largestChunk[0])} (${formatBytes(largestChunk[1].rendered)} raw${totalGzip ? `, ${formatBytes(largestChunk[1].gzip)} gzip` : ""}).`,
    `Top sources: ${topPackages.join(", ")}.`
  ];

  return segments.join(" ");
}

function mapPartToChunk(nodeMetas: Record<string, NodeMeta>): Map<string, string> {
  const result = new Map<string, string>();

  for (const meta of Object.values(nodeMetas)) {
    if (typeof meta !== "object") continue;
    if (!("moduleParts" in meta) || typeof meta.moduleParts !== "object") continue;
    for (const [chunkName, uid] of Object.entries(meta.moduleParts)) {
      if (typeof chunkName === "string" && typeof uid === "string") {
        result.set(uid, chunkName);
      }
    }
  }

  return result;
}

function accumulateSize(target: Map<string, SizeTotals>, key: string, rendered: number, gzip: number): void {
  const current = target.get(key) ?? {
    gzip: 0,
    rendered: 0
  };
  current.rendered += rendered;
  current.gzip += gzip;
  target.set(key, current);
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
  if (!bytes || !Number.isFinite(bytes)) return "0 B";
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

function shorten(name: string, maxLength = 28): string {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength - 3)}...`;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
