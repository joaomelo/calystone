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

interface DirectoryFixture {
  metadata: undefined
  options: DirectoryOptions
}

interface FileFixture {
  metadata: ArrayBuffer
  options: ArtifactOptions
}

type Fixture = DirectoryFixture | FileFixture;

export function createFixtures(parent: Directory): Fixture[] {
  const childrenData: Fixture[] = [];

  const subDirectories = createSubdirectories(parent);
  childrenData.push(...subDirectories);

  const descriptorFile = createDescriptorFile(parent);
  if (descriptorFile) {
    childrenData.push(descriptorFile);
  }

  const binaries = createOrdinaryFiles(parent);
  childrenData.push(...binaries);

  return childrenData;
}

export function isFileFixture(fixture: Fixture): fixture is FileFixture {
  return fixture.metadata !== undefined;
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

function createOrdinaryFiles(parent: Directory) {
  const fixtures: Fixture[] = [];

  const extensionsToUse = ["txt", "exe"];
  const howManyMoreExtensions = faker.helpers.rangeToNumber({
    max: 10,
    min: 3
  });
  for (let i = 0; i < howManyMoreExtensions; i++) {
    extensionsToUse.push(faker.helpers.arrayElement([ "txt", "md", "exe", "bin", "dll", "pdf", "jpg", "png", "zip", "csv", "json", "xml", "docx", "xlsx", "pptx" ]));
  }

  for (const extension of extensionsToUse) {
    const id = createId();
    const binaryFile = fakeFile(extension);
    fixtures.push({
      metadata: binaryFile.content,
      options: {
        id,
        parentId: parent.id,
        ...binaryFile
      }
    });
  }

  return fixtures;
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
