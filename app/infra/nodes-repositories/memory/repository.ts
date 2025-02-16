import type { ArtifactData, Id, NodeDataAndKind } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import { NodesRepositoryBase } from "../base";
import { fakeArtifactData, fakeNode, fakeTextArtifact } from "./fakes";

type MemoryMetadata = ArtifactData | undefined;

export class MemoryNodesRepository extends NodesRepositoryBase<MemoryMetadata> {
  constructor(rootDirectoryName: string) {
    const rootData: NodeDataAndKind = {
      id: createId(),
      kind: "directory",
      name: rootDirectoryName,
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const cachedData = this.nodesMetadata.get(id);
    if (cachedData) return Promise.resolve(cachedData);

    const data = fakeArtifactData();
    this.nodesMetadata.set(id, data);

    return Promise.resolve(data);
  }

  openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const childrenData: NodeDataAndKind[] = [];

    // garantees at least one text file and one subdirectory at the root level for e2e testing
    if (id === this.rootData.id) {
      childrenData.push(fakeTextArtifact(id));
      childrenData.push(fakeNode(id, "directory"));
    }

    const howManyChildren = faker.helpers.rangeToNumber({ max: 3, min: 1 });
    for (let i = 0; i < howManyChildren; i++) {
      childrenData.push(fakeNode(id));
    }

    return Promise.resolve(childrenData);
  }

  postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const data: ArtifactData = {
      content,
      lastModified: Date.now(),
      size: content.byteLength
    };
    this.nodesMetadata.set(id, data);
    return Promise.resolve();
  }
}
