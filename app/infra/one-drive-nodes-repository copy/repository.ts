import type { ArtifactData, Id, NodeDataAndKind, NodesRepository } from "@/domain";

import { createId } from "@/domain";
import { faker } from "@faker-js/faker";

import { fakeArtifactData, fakeDirectoryName, fakeNode, fakeTextArtifact } from "./fakes";

export class MemoryNodesRepository implements NodesRepository {
  artifactRegistry: Map<Id, ArtifactData>;
  rootData: NodeDataAndKind;

  constructor(accessToken) {
    this.artifactRegistry = new Map();
    this.rootData = {
      id: createId(),
      kind: "directory",
      name: fakeDirectoryName(),
      parentId: undefined
    };
    const graphClient = Client.init({ authProvider: (done) => { done(null, accessToken); }, });
  }

  boot(): NodeDataAndKind {
    // this.graphClient = graphClient;
    // const rootFolders = await graphClient.api("/me/drive/root/children").get() as unknown;
    // console.log({ rootFolders });
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
    this.artifactRegistry.set(id, data);
    return Promise.resolve();
  }
}
