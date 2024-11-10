import type { Media } from "@/domain/media";

import { isMedia } from "@/domain/media";

import type { FileSystemAccessMediaResources } from "./resource";

import { isFileSystemAccessMediaResources } from "./resource";

export interface FileSystemAccessMedia extends Media<FileSystemAccessMediaResources> {
  resources: FileSystemAccessMediaResources;
}

export function isFileSystemAccessMedia(media: unknown): media is FileSystemAccessMedia {
  if (!isMedia(media)) return false;
  return isFileSystemAccessMediaResources(media.resources);
}