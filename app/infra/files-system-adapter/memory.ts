import type { DirectoryDataOptions, Id } from "@/domain";
import type { ArtifactOrDirectoryDataOptions } from "@/services";

import { createId } from "@/domain";
import { fakeDirectory, fakeFile, fakeFileSystemEntry } from "@/utils";
import { faker } from "@faker-js/faker";

import { FileSystemBaseAdapter } from "./base";

type MemoryMetadata = ArrayBuffer | undefined;

export class FileSystemMemoryAdapter extends FileSystemBaseAdapter<MemoryMetadata> {
  constructor(rootDirectoryName: string) {
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootDirectoryName,
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    const cachedData = this.nodesMetadata.get(id);
    if (cachedData) return Promise.resolve(cachedData);

    const { content } = fakeFile("txt");
    this.nodesMetadata.set(id, content);

    return Promise.resolve(content);
  }

  openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    if (id === this.rootData.id) {
      // garantees at least one text file and one subdirectory at the root level for e2e testing
      const file = fakeFile("txt");
      childrenData.push({ id: createId(), parentId: id, ...file });

      const directory = fakeDirectory();
      childrenData.push({ id: createId(), parentId: id, ...directory });
    }

    const howManyChildren = faker.helpers.rangeToNumber({ max: 5, min: 1 });
    for (let i = 0; i < howManyChildren; i++) {
      const entry = fakeFileSystemEntry();
      childrenData.push({ id: createId(), parentId: id, ...entry });
    }

    return Promise.resolve(childrenData);
  }

  postFileContent(id: Id, content: ArrayBuffer): Promise<void> {
    this.nodesMetadata.set(id, content);
    return Promise.resolve();
  }
}
