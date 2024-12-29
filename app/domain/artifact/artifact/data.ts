import { isObjectLike } from "@/utils";

export interface ArtifactData {
  content: ArrayBuffer;
  lastModified: number;
  size: number;
};

export function isArtifactData(value: unknown): value is ArtifactData {
  if (!isObjectLike(value)) return false;
  if (!("lastModified" in value) || (typeof value.lastModified !== "number")) return false;
  if (!("size" in value) || (typeof value.size !== "number")) return false;
  if (!("content" in value) || !(value.content instanceof ArrayBuffer)) return false;
  return true;
}