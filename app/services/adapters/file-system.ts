import type { ArtifactDataOptions, DirectoryDataOptions, Id } from "@/domain";

export type ArtifactOrDirectoryDataOptions = ArtifactDataOptions | DirectoryDataOptions;

export interface FileSystemAdapter {
  rootData: DirectoryDataOptions;
  reset(): void;
  openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]>;
  fetchFileContent(id: Id): Promise<ArrayBuffer>;
  postFileContent(id: Id, content: ArrayBuffer): Promise<void>;
}