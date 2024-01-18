import { DRAG_SECTIONS, isDragSection } from "./drag-sections";

export function isDragConfiguration(config) {
  if (typeof config === "boolean") return true;
  if (typeof config !== "object") return false;
  return Object
    .entries(config)
    .every(([key, value]) => isDragSection(key) && typeof value === "boolean");
}

export function normalizeDragConfiguration(config) {
  if (typeof config === "boolean") {
    return {
      [DRAG_SECTIONS.BOTTOM]: config,
      [DRAG_SECTIONS.MIDDLE]: config,
      [DRAG_SECTIONS.TOP]: config,
    };
  }

  return config;
}
