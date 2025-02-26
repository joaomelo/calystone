import type { ArtifactDataOptions, DirectoryDataOptions, Id } from "@/domain";

export type ArtifactOrDirectoryDataOptions = ArtifactDataOptions | DirectoryDataOptions;

export interface FileSystemAdapter {
  rootData: DirectoryDataOptions;
  reset(): void;
  openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]>;
  fetchFileContent(id: Id): Promise<ArrayBuffer>;
  postFileContent(options: { content: ArrayBuffer; id: Id, }): Promise<void>;
  renameDirectory(options: { id: Id, name: string }): Promise<void>;
  renameFile(options: { id: Id, name: string }): Promise<void>;
}