import type {
  ArtifactOptions,
  Directory,
  DirectoryOptions
} from "@/domain";

import {
  createId,
  Descriptor
} from "@/domain";
import {
  fakeDirectory,
  fakeFile
} from "@/utils";
import { faker } from "@faker-js/faker";

type Fixture = {
  metadata: ArrayBuffer
  options: ArtifactOptions
} | {
  metadata: undefined
  options: DirectoryOptions
};

export function createFixtures(parent: Directory): Fixture[] {
  const childrenData: Fixture[] = [];

  const subDirectories = createSubdirectories(parent);
  childrenData.push(...subDirectories);

  const descriptorFile = createDescriptorFile(parent);
  if (descriptorFile) {
    childrenData.push(descriptorFile);
  }

  return childrenData;
}

function createDescriptorFile(parent: Directory) {
  const hasDescriptorFile = parent.isRoot() || faker.datatype.boolean();
  if (!hasDescriptorFile) return;

  const descriptorFile = fakeFile("txt");
  descriptorFile.name = `${Descriptor.descriptorBasename}.txt`;
  const descriptorFileId = createId();
  return {
    metadata: descriptorFile.content,
    options: {
      id: descriptorFileId,
      parentId: parent.id,
      ...descriptorFile
    }
  };
}

function createSubdirectories(parent: Directory) {
  const subdirectories: Fixture[] = [];

  const maxSubdirectories = 3;
  const minSubdirectories = parent.isRoot() ? 2 : 0;
  const howManySubdirectories = faker.helpers.rangeToNumber({
    max: maxSubdirectories,
    min: minSubdirectories
  });

  for (let i = 0; i < howManySubdirectories; i++) {
    const id = createId();
    const entry = fakeDirectory();
    subdirectories.push({
      metadata: undefined,
      options: {
        id,
        parentId: parent.id,
        ...entry
      }
    });
  }

  return subdirectories;
}