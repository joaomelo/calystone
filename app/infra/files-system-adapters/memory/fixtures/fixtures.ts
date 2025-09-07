import type {
  Directory,
  Id
} from "@/domain";

import { faker } from "@faker-js/faker";

import type {
  DirectoryFixture,
  FileFixture,
  Fixture
} from "./fixture";

import { createBinaryFile } from "./binary";
import { createDescriptorFile } from "./descriptor";
import { createDirectory } from "./directory";
import { createPdfFile } from "./pdf";
import { createTextFile } from "./text";
import { createTodoFile } from "./todo";

export function createFixtures(parent: Directory): Fixture[] {
  const childrenData: Fixture[] = [];

  const subDirectories = createSubdirectories(parent);
  childrenData.push(...subDirectories);

  const files = createFiles(parent);
  childrenData.push(...files);
  return childrenData;
}

export function isFileFixture(fixture: Fixture): fixture is FileFixture {
  return fixture.metadata !== undefined;
}

function createFiles(parent: Directory) {
  const files: FileFixture[] = [];

  type Builder = [(parentId: Id) => FileFixture, number];
  const builders: Builder[] = [];

  const howManyDescriptors = faker.helpers.rangeToNumber({
    max: 1,
    min: parent.isRoot() ? 1 : 0
  });
  builders.push([createDescriptorFile, howManyDescriptors]);

  const howManyTodos = faker.helpers.rangeToNumber({
    max: 5,
    min: parent.isRoot() ? 3 : 0
  });
  builders.push([createTodoFile, howManyTodos]);

  const howManyText = faker.helpers.rangeToNumber({
    max: 2,
    min: parent.isRoot() ? 1 : 0
  });
  builders.push([createTextFile, howManyText]);

  const howManyPdfs = faker.helpers.rangeToNumber({
    max: 2,
    min: parent.isRoot() ? 1 : 0
  });
  builders.push([createPdfFile, howManyPdfs]);

  const howManyBinaries = faker.helpers.rangeToNumber({
    max: 2,
    min: parent.isRoot() ? 1 : 0
  });
  builders.push([createBinaryFile, howManyBinaries]);

  builders.forEach(([builder, howMany]) => {
    for (let i = 0; i < howMany; i++) {
      const file = builder(parent.id);
      files.push(file);
    }
  });

  return files;
}

function createSubdirectories(parent: Directory) {
  const subdirectories: DirectoryFixture[] = [];

  // we want to garantee subdirectories in root and direct a finite depth to not disrupt manual tests
  const maxSubdirectories = parent.isRoot() ? 5 : 1;
  const minSubdirectories = parent.isRoot() ? 3 : 0;

  const howManySubdirectories = faker.helpers.rangeToNumber({
    max: maxSubdirectories,
    min: minSubdirectories
  });

  for (let i = 0; i < howManySubdirectories; i++) {
    subdirectories.push(createDirectory(parent.id));
  }

  return subdirectories;
}
