import type { Artifact, ArtifactDataOptions, Directory, DirectoryDataOptions, Node } from "@/domain";

import { createId } from "@/domain";
import { fakeDirectory, fakeFile, fakeFileSystemEntry, Status, throwError } from "@/utils";
import { delay } from "@/utils/async";
import { faker } from "@faker-js/faker";

import type { ArtifactOrDirectoryDataOptions } from "../file-system";

import { BaseFileSystemAdapter } from "../base";

type ArtifactMetadata = ArrayBuffer;
type DirectoryMetadata = undefined;
type RootMetadata = undefined;

export class MemoryFileSystemAdapter extends BaseFileSystemAdapter<RootMetadata, DirectoryMetadata, ArtifactMetadata> {
  private readonly delayInSeconds: number;

  constructor(options: { delayInSeconds: number; rootDirectoryName: string }) {
    const { delayInSeconds, rootDirectoryName } = options;
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootDirectoryName,
      parentId: undefined
    };
    super({ rootData, rootMetadata: undefined });
    this.delayInSeconds = delayInSeconds;
  }

  async createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactDataOptions> {
    await delay(this.delayInSeconds);

    const { name, parent: { id: parentId } } = options;

    const id = createId();
    const emptyBuffer = new ArrayBuffer(0);
    this.metadatas.setFile({ id, metadata: emptyBuffer });

    const data: ArtifactDataOptions = {
      id,
      lastModified: Date.now(),
      name,
      parentId,
      size: emptyBuffer.byteLength
    };

    return data;
  }

  async createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryDataOptions> {
    await delay(this.delayInSeconds);

    const id = createId();
    this.metadatas.setDirectory({ id, metadata: undefined });

    const { name, parent: { id: parentId } } = options;
    const data: DirectoryDataOptions = { id, name, parentId };

    return data;
  }

  async fetchContent(artifact: Artifact): Promise<ArrayBuffer> {
    await delay(this.delayInSeconds);

    const { metadata: cachedData } = this.metadatas.getOfFileOrThrow(artifact.id);
    return cachedData;
  }

  async move(options: { subject: Node, target: Directory }): Promise<void> {
    await delay(this.delayInSeconds);

    const moveable = this.moveable(options.subject);
    moveable.throwOnFail();
  }

  moveable(subject: Node) {
    return this.failIfRoot(subject);
  }

  async open(parent: Directory): Promise<ArtifactOrDirectoryDataOptions[]> {
    await delay(this.delayInSeconds);

    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    const shouldGaranteeDataExpectedByE2e = parent.id === this.rootData.id;
    if (shouldGaranteeDataExpectedByE2e) {
      const file = fakeFile("txt");
      const fileId = createId();
      childrenData.push({ id: fileId, parentId: parent.id, ...file });
      this.metadatas.setFile({ id: fileId, metadata: file.content });

      const binary = fakeFile("exe");
      const binaryId = createId();
      childrenData.push({ id: binaryId, parentId: parent.id, ...binary });
      this.metadatas.setFile({ id: binaryId, metadata: binary.content });

      const directoryOne = fakeDirectory();
      const directoryOneId = createId();
      childrenData.push({ id: directoryOneId, parentId: parent.id, ...directoryOne });
      this.metadatas.setDirectory({ id: directoryOneId, metadata: undefined });

      const directoryTwo = fakeDirectory();
      const directoryTwoId = createId();
      childrenData.push({ id: directoryTwoId, parentId: parent.id, ...directoryTwo });
      this.metadatas.setDirectory({ id: directoryTwoId, metadata: undefined });
    }

    const howManyChildren = faker.helpers.rangeToNumber({ max: 5, min: 1 });
    for (let i = 0; i < howManyChildren; i++) {
      const entry = fakeFileSystemEntry();
      childrenData.push({ id: createId(), parentId: parent.id, ...entry });
    }

    return childrenData;
  }

  async postContent(artifact: Artifact): Promise<void> {
    await delay(this.delayInSeconds);

    const { id } = artifact;
    const content = artifact.toBinary();
    this.metadatas.setFile({ id, metadata: content });
  }

  async remove(node: Node): Promise<void> {
    await delay(this.delayInSeconds);

    const removeable = this.removeable(node);
    removeable.throwOnFail();

    this.metadatas.remove(node);
  }

  removeable(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;
    return Status.ok();
  }

  async rename(options: { name: string; node: Node, }): Promise<void> {
    await delay(this.delayInSeconds);

    const { name, node } = options;

    const renameable = this.renameable(node);
    renameable.throwOnFail();

    if (name.includes("/")) {
      throwError("INVALID_CHAR", "invalid char for naming nodes in the file system");
    }
  }

  renameable(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;
    return Status.ok();
  }

}
