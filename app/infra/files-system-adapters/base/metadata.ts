import type { Id } from "@/domain";

export interface DirectoryMetadataContainer<T> {
  kind: "directory";
  id: Id;
  metadata: T
}

export interface FileMetadataContainer<T> {
  kind: "file";
  id: Id;
  metadata: T
}

export interface RootMetadataContainer<T> extends DirectoryMetadataContainer<T> {root: true;}
