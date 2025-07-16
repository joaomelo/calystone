import type {
  Artifact,
  ArtifactOptions,
  Directory,
  DirectoryOptions,
  Node
} from "@/domain";
import type { Status } from "@/utils";

export type ArtifactOrDirectoryOptions = ArtifactOptions | DirectoryOptions;

export interface FileSystemAdapter {
  clear(directory: Directory): void;
  createArtifact(options: {
    name: string,
    parent: Directory
  }): Promise<ArtifactOptions>;
  createDirectory(options: {
    name: string,
    parent: Directory
  }): Promise<DirectoryOptions>;
  fetchContent(artifact: Artifact): Promise<ArrayBuffer>;
  moveable(subject: Node): Status;
  move(options: {
    subject: Node,
    target: Directory
  }): Promise<void>;
  open(parent: Directory): Promise<ArtifactOrDirectoryOptions[]>;
  postContent(artifact: Artifact): Promise<void>;
  removeable(node: Node): Status;
  remove(node: Node): Promise<void>;
  renameable(node: Node): Status;
  rename(options: {
    name: string;
    node: Node,
  }): Promise<void>;
}