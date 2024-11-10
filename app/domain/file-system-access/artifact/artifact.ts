import type { Artifact } from "@/domain/artifact";

export type FileSystemAccessArtifact = Artifact<FileSystemAccessArtifactResources>;

interface FileSystemAccessArtifactResources {
  file: File
  handle: FileSystemFileHandle,
}