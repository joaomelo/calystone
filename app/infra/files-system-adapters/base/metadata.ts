import type { Id } from "@/domain";

export interface DirectoryMetadataContainer<DirectoryMetadata> {
  kind: "directory";
  id: Id;
  metadata: DirectoryMetadata
}

export interface FileMetadataContainer<FileMetadata> {
  kind: "file";
  id: Id;
  metadata: FileMetadata
}
