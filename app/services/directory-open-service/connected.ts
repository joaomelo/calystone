import type { Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { createNode, Directory } from "@/domain";
import { throwError } from "@/utils";

import type { DirectoryOpenService } from "./open";

interface Options {
  fileSystemAdapter: FileSystemAdapter
  nodes: Nodes
}

export class ConnectedDirectoryOpenService implements DirectoryOpenService {
  private readonly fileSystemAdapter: FileSystemAdapter;
  private readonly nodes: Nodes;

  constructor({ fileSystemAdapter, nodes }: Options) {
    this.fileSystemAdapter = fileSystemAdapter;
    this.nodes = nodes;
  }

  async open(directory: Directory) {
    if (directory.isLoaded()) return;

    directory.busy();

    try {
      const nodesData = await this.fileSystemAdapter.openDirectory(directory.id);
      for (const data of nodesData) {
        const node = createNode({ nodes: this.nodes, ...data });
        this.nodes.set(node);
      }
      directory.loaded();
    } catch (error) {
      directory.unloaded();
      throwError("UNABLE_TO_OPEN_DIRECTORY", error);
    } finally {
      directory.idle();
    }
  }

  async openRoots() {
    for (const node of this.nodes.list()) {
      if (!node.isRoot()) continue;
      if (!(node instanceof Directory)) continue;
      if (node.isLoaded()) continue;

      await this.open(node);
    }
  }
}