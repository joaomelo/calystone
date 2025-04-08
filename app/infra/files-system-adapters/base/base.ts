import type { Artifact, ArtifactDataOptions, DirectoryDataOptions, Node } from "@/domain";

import { Directory } from "@/domain";
import { Status } from "@/utils";

import type { ArtifactOrDirectoryDataOptions, FileSystemAdapter } from "../file-system";

import { Metadatas } from "./metadatas";

export abstract class BaseFileSystemAdapter<R, D, F> implements FileSystemAdapter {
  protected readonly metadatas: Metadatas<R, D, F>;
  protected readonly rootData: DirectoryDataOptions;

  constructor(options: { rootData: DirectoryDataOptions, rootMetadata: R }) {
    const { rootData, rootMetadata } = options;
    this.rootData = rootData;
    this.metadatas = new Metadatas({ rootId: rootData.id, rootMetadata });
    this.resetToRootOnly();
  }

  abstract createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactDataOptions>;
  abstract createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions>;
  abstract fetchContent(artifact: Artifact): Promise<ArrayBuffer>;

  abstract move(options: { subject: Node, target: Directory }): Promise<void>;
  abstract moveable(subject: Node): Status;
  abstract open(directory: Directory): Promise<ArtifactOrDirectoryDataOptions[]>;
  abstract postContent(artifact: Artifact): Promise<void>;
  abstract remove(node: Node): Promise<void>;
  abstract removeable(node: Node): Status;

  abstract rename(options: { name: string; node: Node, }): Promise<void>;
  abstract renameable(node: Node): Status;

  resetToRootOnly() {
    this.metadatas.reset();
    return this.rootData;
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