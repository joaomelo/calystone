import type { Artifact, ArtifactDataOptions, Directory, DirectoryDataOptions, Node } from "@/domain";
import type { Status } from "@/utils";

export type ArtifactOrDirectoryDataOptions = ArtifactDataOptions | DirectoryDataOptions;

export interface FileSystemAdapter {
  createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactDataOptions>;
  createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions>;
  fetchContent(artifact: Artifact): Promise<ArrayBuffer>;
  moveable(subject: Node): Status;
  move(options: { subject: Node, target: Directory }): Promise<void>;
  open(parent: Directory): Promise<ArtifactOrDirectoryDataOptions[]>;
  postContent(artifact: Artifact): Promise<void>;
  removeable(node: Node): Status;
  remove(node: Node): Promise<void>;
  renameable(node: Node): Status;
  rename(options: { name: string; node: Node, }): Promise<void>;
  resetToRootOnly(): DirectoryDataOptions;
}