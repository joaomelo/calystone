import type { Nodes } from "@/domain";
import type { FileSystemAdapter } from "@/infra";

import { Artifact, Directory, isArtifactDataOptions } from "@/domain";
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
    if (directory.status !== "unloaded") return;

    directory.status = "loading";

    try {
      const nodesData = await this.fileSystemAdapter.openDirectory(directory.id);
      for (const data of nodesData) {
        const node = isArtifactDataOptions(data)
          ? new Artifact({ nodes: this.nodes, ...data })
          : new Directory({ nodes: this.nodes, ...data });
        this.nodes.set(node);
      }
    } catch (error) {
      directory.status = "unloaded";
      throwError("UNABLE_TO_OPEN_DIRECTORY", error);
    }

    directory.status = "loaded";
  }

  async openRoots() {
    for (const node of this.nodes.list()) {
      if (!node.isRoot()) continue;
      if (!(node instanceof Directory)) continue;
      if (node.status !== "unloaded") continue;

      await this.open(node);
    }
  }

}