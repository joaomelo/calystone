import type { Media } from "@/domain/media";

import { isMedia } from "@/domain/media";
import { isObjectLike } from "@/utils";

export interface FileSystemAccessMedia extends Media<FileSystemAccessResources> {
  resources: FileSystemAccessResources;
  source: "fileSystemAccess";
}

interface FileSystemAccessResources {
  root: FileSystemDirectoryHandle
};

export function isFileSystemAccessMedia(media: unknown): media is FileSystemAccessMedia {
  if (!isMedia(media)) return false;
  if (media.source !== "fileSystemAccess") return false;
  if (!isObjectLike(media.resources)) return false;
  return "root" in media.resources;
}