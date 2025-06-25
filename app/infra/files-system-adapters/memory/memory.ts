import type { Artifact, ArtifactOptions, Directory, DirectoryOptions, Node, Nodes } from "@/domain";

import { createId, Descriptor } from "@/domain";
import { fakeDirectory, fakeFile, Status, throwError } from "@/utils";
import { delay } from "@/utils/async";
import { faker } from "@faker-js/faker";

import type { ArtifactOrDirectoryOptions } from "../file-system";

import { BaseFileSystemAdapter } from "../base";

type ArtifactMetadata = ArrayBuffer;
type DirectoryMetadata = undefined;
type RootMetadata = undefined;

export class MemoryFileSystemAdapter extends BaseFileSystemAdapter<RootMetadata, DirectoryMetadata, ArtifactMetadata> {
  private readonly delayInMilliseconds: number;

  constructor(options: { delayInMilliseconds: number; nodes: Nodes; rootDirectoryName: string }) {
    const { delayInMilliseconds, nodes, rootDirectoryName } = options;
    const rootData: DirectoryOptions = {
      id: createId(),
      name: rootDirectoryName,
      parentId: undefined
    };
    super({ nodes, rootData, rootMetadata: undefined });
    this.delayInMilliseconds = delayInMilliseconds;
  }

  async createArtifact(options: { name: string, parent: Directory }): Promise<ArtifactOptions> {
    await this.delay();

    const { name, parent: { id: parentId } } = options;

    const id = createId();
    const emptyBuffer = new ArrayBuffer(0);
    this.metadatas.setFile({ id, metadata: emptyBuffer });

    const data: ArtifactOptions = {
      id,
      lastModified: Date.now(),
      name,
      parentId,
      size: emptyBuffer.byteLength
    };

    return data;
  }

  async createDirectory(options: { name: string, parent: Directory }): Promise<DirectoryOptions> {
    await this.delay();

    const id = createId();
    this.metadatas.setDirectory({ id, metadata: undefined });

    const { name, parent: { id: parentId } } = options;
    const data: DirectoryOptions = { id, name, parentId };

    return data;
  }

  async fetchContent(artifact: Artifact): Promise<ArrayBuffer> {
    await this.delay();

    const { metadata: cachedData } = this.metadatas.getOfFileOrThrow(artifact.id);
    return cachedData;
  }

  async move(options: { subject: Node, target: Directory }): Promise<void> {
    await this.delay();

    const { subject, target } = options;
    this.moveable(subject).throwOnFail();
    this.nodes.moveable({ subject, target }).throwOnFail();
  }

  moveable(subject: Node) {
    return this.failIfRoot(subject);
  }

  async open(parent: Directory): Promise<ArtifactOrDirectoryOptions[]> {
    await this.delay();

    const childrenData: ArtifactOrDirectoryOptions[] = [];

    const shouldGaranteeDataExpectedByE2e = parent.id === this.rootData.id;
    if (shouldGaranteeDataExpectedByE2e) {
      const descriptorFile = fakeFile("txt");
      descriptorFile.name = `${Descriptor.descriptorBasename}.txt`;
      const descriptorFileId = createId();
      childrenData.push({ id: descriptorFileId, parentId: parent.id, ...descriptorFile });
      this.metadatas.setFile({ id: descriptorFileId, metadata: descriptorFile.content });

      const todoFile = fakeFile("todo");
      const todoFileId = createId();
      childrenData.push({ id: todoFileId, parentId: parent.id, ...todoFile });
      this.metadatas.setFile({ id: todoFileId, metadata: todoFile.content });

      const binaryFile = fakeFile("exe");
      const binaryFileId = createId();
      childrenData.push({ id: binaryFileId, parentId: parent.id, ...binaryFile });
      this.metadatas.setFile({ id: binaryFileId, metadata: binaryFile.content });

      const oneDirectory = fakeDirectory();
      const oneDirectoryId = createId();
      childrenData.push({ id: oneDirectoryId, parentId: parent.id, ...oneDirectory });
      this.metadatas.setDirectory({ id: oneDirectoryId, metadata: undefined });

      const moreThanOneDirectory = fakeDirectory();
      const moreThanOneDirectoryId = createId();
      childrenData.push({ id: moreThanOneDirectoryId, parentId: parent.id, ...moreThanOneDirectory });
      this.metadatas.setDirectory({ id: moreThanOneDirectoryId, metadata: undefined });
    }

    const howManyChildren = faker.helpers.rangeToNumber({ max: 5, min: 1 });
    for (let i = 0; i < howManyChildren; i++) {
      const id = createId();
      const kind = faker.helpers.arrayElement(["file", "directory"]);
      if (kind === "file") {
        const entry = fakeFile();
        this.metadatas.setFile({ id, metadata: entry.content });
        childrenData.push({ id, parentId: parent.id, ...entry });
      } else {
        const entry = fakeDirectory();
        this.metadatas.setDirectory({ id, metadata: undefined });
        childrenData.push({ id, parentId: parent.id, ...entry });
      }
    }

    return childrenData;
  }

  async postContent(artifact: Artifact): Promise<void> {
    await this.delay();

    const { id } = artifact;
    const content = artifact.toBinary();
    this.metadatas.setFile({ id, metadata: content });
  }

  async remove(node: Node): Promise<void> {
    await this.delay();

    const removeable = this.removeable(node);
    removeable.throwOnFail();

    this.metadatas.remove(node);
  }

  removeable(node: Node) {
    const rootStatus = this.failIfRoot(node);
    if (rootStatus.isFail()) return rootStatus;
    return Status.ok();
  }

  async rename(options: { name: string }): Promise<void> {
    await this.delay();

    const { name } = options;

    const renameable = this.renameable();
    renameable.throwOnFail();

    if (name.includes("/")) {
      throwError("INVALID_CHAR", "invalid char for naming nodes in the file system");
    }
  }

  renameable() {
    return Status.ok();
  }

  private async delay() {
    await delay(this.delayInMilliseconds);
  }

}
