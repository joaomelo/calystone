import type { ArtifactDataOptions, DirectoryDataOptions, Id, Node } from "@/domain";

export type ArtifactOrDirectoryDataOptions = ArtifactDataOptions | DirectoryDataOptions;

export interface FileSystemAdapter {
  rootData: DirectoryDataOptions;
  reset(): void;
  openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]>;
  fetchFileContent(id: Id): Promise<ArrayBuffer>;
  postFileContent(options: { content: ArrayBuffer; id: Id, }): Promise<void>;
  renameNode(options: { id: Id, name: string }): Promise<void>;
  removeNode(node: Node): Promise<void>;
  moveNode(options: { subject: Node, target: Node }): Promise<void>;
  createDirectory(options: { name: string, parent: Node }): Promise<void>;
}