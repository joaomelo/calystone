import type { ArtifactData, NodeDataAndKind } from "@/domain";

import { throwCritical } from "@/utils";

import { NodesRepositoryBase } from "../base";

export class GoogleDriveNodesRepository extends NodesRepositoryBase<undefined> {

  constructor() {
    const rootData: NodeDataAndKind = {
      id: "root",
      kind: "directory",
      name: "GoogleDrive",
      parentId: undefined
    };
    super(rootData, undefined);
  }

  fetchArtifact(): Promise<ArtifactData> {
    throwCritical("NOT_IMPLEMENTED", "google drive fetch artifact is not implemented");
  }

  openDirectory(): Promise<NodeDataAndKind[]> {
    throwCritical("NOT_IMPLEMENTED", "google drive open directory is not implemented");
  }

  postArtifact(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "google drive post artifact is not implemented");
  }
}
