import type {
  Artifact,
  ArtifactOptions,
  DirectoryOptions,
  Node,
  Nodes
} from "@/domain";

import { Directory } from "@/domain";
import { Status } from "@/utils";

import type {
  ArtifactOrDirectoryOptions,
  FileSystemAdapter
} from "../file-system";

import { Metadatas } from "./metadatas";

export abstract class BaseFileSystemAdapter<DirectoryMetadata, FileMetadata> implements FileSystemAdapter {
  protected readonly metadatas: Metadatas<DirectoryMetadata, FileMetadata>;
  protected readonly nodes: Nodes;
  private readonly rootOptions: DirectoryOptions;

  constructor({
    nodes,
    rootMetadata,
    rootOptions
  }: {
    nodes: Nodes;
    rootMetadata: DirectoryMetadata
    rootOptions: DirectoryOptions,
  }) {
    this.nodes = nodes;
    this.rootOptions = rootOptions;
    this.metadatas = new Metadatas({
      nodes,
      rootId: rootOptions.id,
      rootMetadata
    });
  }

  clear(directory: Directory): void {
    this.metadatas.clear(directory);
  }

  abstract createArtifact(options: {
    name: string,
    parent: Directory
  }): Promise<ArtifactOptions>;
  abstract createDirectory(options: {
    name: string,
    parent: Directory
  }): Promise<DirectoryOptions>;
  abstract fetchContent(artifact: Artifact): Promise<ArrayBuffer>;
  abstract move(options: {
    subject: Node,
    target: Directory
  }): Promise<void>;
  abstract moveable(subject: Node): Status;
  abstract open(directory: Directory): Promise<ArtifactOrDirectoryOptions[]>;
  abstract postContent(artifact: Artifact): Promise<void>;
  abstract remove(node: Node): Promise<void>;
  abstract removeable(node: Node): Status;
  abstract rename(options: {
    name: string;
    node: Node,
  }): Promise<void>;
  abstract renameable(node: Node): Status;

  resolveRootOptions(): DirectoryOptions {
    return this.rootOptions;
  }

  protected failIfDirectory(node: Node) {
    if (node instanceof Directory) return Status.fail("DIRECTORY_NODE");
    return Status.ok();
  }

  protected failIfRoot(node: Node) {
    if (node.isRoot()) return Status.fail("ROOT_NODE");
    return Status.ok();
  }

}