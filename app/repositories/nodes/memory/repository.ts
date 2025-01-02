import type { ArtifactData, Id, NodeDataAndKind, NodesRepository } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import { fakeArtifactData, fakeDirectoryName, fakeNode, fakeTextArtifact } from "./fakes";

export class MemoryNodesRepository implements NodesRepository {
  artifactRegistry: Map<Id, ArtifactData>;
  rootData: NodeDataAndKind;

  constructor() {
    this.artifactRegistry = new Map();
    this.rootData = {
      id: createId(),
      kind: "directory",
      name: fakeDirectoryName(),
      parentId: undefined
    };
  }

  boot(): NodeDataAndKind {
    return this.rootData;
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const cachedData = this.artifactRegistry.get(id);
    if (cachedData) return Promise.resolve(cachedData);

    const data = fakeArtifactData();
    this.artifactRegistry.set(id, data);

    return Promise.resolve(data);
  }

  openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const howManyChildren = faker.helpers.rangeToNumber({ max: 20, min: 5 });
    const childrenData: NodeDataAndKind[] = [fakeTextArtifact(id)];
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
    this.artifactRegistry.set(id, data);
    return Promise.resolve();
  }
}
