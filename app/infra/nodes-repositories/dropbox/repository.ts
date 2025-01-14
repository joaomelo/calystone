import type { ArtifactData, NodeDataAndKind } from "@/domain";

import { throwCritical } from "@/utils";

import { NodesRepositoryBase } from "../base";

export class DropboxNodesRepository extends NodesRepositoryBase<undefined> {

  constructor() {
    const rootData: NodeDataAndKind = {
      id: "root",
      kind: "directory",
      name: "OneDrive",
      parentId: undefined
    };
    super(rootData, undefined);
  }

  fetchArtifact(): Promise<ArtifactData> {
    throwCritical("NOT_IMPLEMENTED", "dropbox fetch artifact is not implemented");
  }

  openDirectory(): Promise<NodeDataAndKind[]> {
    throwCritical("NOT_IMPLEMENTED", "dropbox open directory is not implemented");
  }

  postArtifact(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "dropbox post artifact is not implemented");
  }
}
