import type { DirectoryDataOptions, Id, Node } from "@/domain";

import { createId } from "@/domain";
import { fakeDirectory, fakeFile, fakeFileSystemEntry, throwError, throwNull } from "@/utils";
import { delay } from "@/utils/async";
import { faker } from "@faker-js/faker";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

import { BaseFileSystemAdapter } from "./base";

type MemoryMetadata = ArrayBuffer | undefined;

export class MemoryFileSystemAdapter extends BaseFileSystemAdapter<MemoryMetadata> {
  private readonly delayInSeconds: number;

  constructor(options: { delayInSeconds: number; rootDirectoryName: string, }) {
    const { delayInSeconds, rootDirectoryName } = options;
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootDirectoryName,
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });
    this.delayInSeconds = delayInSeconds;
  }

  createDirectory(): Promise<void> {
    throwNull();
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    await delay(this.delayInSeconds);
    const cachedData = this.nodesMetadata.get(id);
    if (cachedData) return Promise.resolve(cachedData);

    const { content } = fakeFile("txt");
    this.nodesMetadata.set(id, content);

    return Promise.resolve(content);
  }

  async moveNode(): Promise<void> {
    await delay(this.delayInSeconds);
    return Promise.resolve();
  }

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    await delay(this.delayInSeconds);
    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    if (id === this.rootData.id) {
      // garantees at least two of the following node types at the root level for e2e testing
      const file = fakeFile("txt");
      childrenData.push({ id: createId(), parentId: id, ...file });

      const binary = fakeFile("exe");
      childrenData.push({ id: createId(), parentId: id, ...binary });

      const directoryOne = fakeDirectory();
      childrenData.push({ id: createId(), parentId: id, ...directoryOne });

      const directoryTwo = fakeDirectory();
      childrenData.push({ id: createId(), parentId: id, ...directoryTwo });
    }

    const howManyChildren = faker.helpers.rangeToNumber({ max: 5, min: 1 });
    for (let i = 0; i < howManyChildren; i++) {
      const entry = fakeFileSystemEntry();
      childrenData.push({ id: createId(), parentId: id, ...entry });
    }

    return Promise.resolve(childrenData);
  }

  async postFileContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    await delay(this.delayInSeconds);
    this.nodesMetadata.set(id, content);
    return Promise.resolve();
  }

  async removeNode(node: Node): Promise<void> {
    await delay(this.delayInSeconds);
    this.removeMetadata(node);
    return Promise.resolve();
  }

  async renameNode(options: { name: string }): Promise<void> {
    await delay(this.delayInSeconds);
    if (options.name.includes("/")) {
      throwError("INVALID_CHAR", "invalid char for naming nodes in the file system");
    }
    return Promise.resolve();
  }
}
