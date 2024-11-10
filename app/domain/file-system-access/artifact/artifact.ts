import type { Artifact } from "@/domain/artifact";

import { isArtifact } from "@/domain/artifact";

import type { FileSystemAccessArtifactResources } from "./resource";

import { isFileSystemAccessArtifactResources } from "./resource";

export type FileSystemAccessArtifact = Artifact<FileSystemAccessArtifactResources>;

export function isFileSystemAccessArtifact(artifact: unknown): artifact is FileSystemAccessArtifact {
  if (!isArtifact(artifact)) return false;
  return isFileSystemAccessArtifactResources(artifact.resources);
}